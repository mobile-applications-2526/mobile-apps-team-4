package be.ucll.service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import be.ucll.dto.AuthResponse;
import be.ucll.dto.LoginDTO;
import be.ucll.dto.RegisterDTO;
import be.ucll.dto.UserDTO;
import be.ucll.model.User;
import be.ucll.repository.UserRepository;
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
            throw new RuntimeException("User with this email already exists");
        }

        User user = new User(
            registerDTO.name(),
            registerDTO.email(),
            passwordEncoder.encode(registerDTO.password())
        );
        User saved = userRepository.save(user);
        return new UserDTO(saved.getName(), saved.getEmail());
    }

    public AuthResponse login(LoginDTO loginDTO) {
        User user = userRepository.findByEmailIgnoreCase(loginDTO.email())
            .orElseThrow(() -> new RuntimeException("User details are not correct"));

        if (!passwordEncoder.matches(loginDTO.password(), user.getPassword())) {
            throw new RuntimeException("User details are not correct");
        }
        UserDTO userDTO = new UserDTO(user.getName(), user.getEmail());
        String token = jwtUtils.generateJwtToken(user.getEmail());
        return new AuthResponse(token,userDTO);
    }

}
