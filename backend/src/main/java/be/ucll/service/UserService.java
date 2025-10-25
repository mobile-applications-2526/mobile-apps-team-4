package be.ucll.service;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import be.ucll.dto.AuthResponse;
import be.ucll.dto.LoginDTO;
import be.ucll.dto.RegisterDTO;
import be.ucll.dto.UserDTO;
import be.ucll.model.User;
import be.ucll.repository.UserRepository;
import be.ucll.util.exceptions.ServiceException;
import be.ucll.util.security.JwtUtils;

@Service
public class UserService {
    private JwtUtils jwtUtils;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public UserDTO register(RegisterDTO registerDTO) {
        if (userRepository.findByEmailIgnoreCase(registerDTO.email()).isPresent()) {
            throw new ServiceException("User with this email already exists",HttpStatus.CONFLICT);
        }

        User user = new User(
            registerDTO.name(),
            registerDTO.email(),
            passwordEncoder.encode(registerDTO.password())
        );
        User saved = userRepository.save(user);
        return new UserDTO(saved.getName(), saved.getEmail(), saved.getId());
    }

    public AuthResponse login(LoginDTO loginDTO) {
        User user = userRepository.findByEmailIgnoreCase(loginDTO.email())
            .orElseThrow(() -> new ServiceException("User details are not correct",HttpStatus.UNAUTHORIZED));

        if (!passwordEncoder.matches(loginDTO.password(), user.getPassword())) {
            throw new ServiceException("User details are not correct",HttpStatus.UNAUTHORIZED);
        }
        UserDTO userDTO = new UserDTO(user.getName(), user.getEmail(), user.getId());
        String token = jwtUtils.generateJwtToken(user.getEmail());
        return new AuthResponse(token,userDTO);
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ServiceException("User with this id does not exist", HttpStatus.NOT_FOUND));
        return new UserDTO(user.getName(),user.getEmail(), user.getId());
    }

    public List<User> getUserByEmailOrName(String emailOrName) {
        return userRepository.findTop5ByEmailContainingIgnoreCaseOrNameContainingIgnoreCase(emailOrName, emailOrName);
    }

}
