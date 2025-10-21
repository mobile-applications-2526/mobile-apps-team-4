package be.ucll.service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import be.ucll.dto.LoginDTO;
import be.ucll.dto.RegisterDTO;
import be.ucll.dto.UserDTO;
import be.ucll.model.User;
import be.ucll.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
        return new UserDTO(saved.getId(), saved.getName(), saved.getEmail());
    }

    public UserDTO login(LoginDTO loginDTO) {
        User user = userRepository.findByEmailIgnoreCase(loginDTO.email())
            .orElseThrow(() -> new RuntimeException("This user does not exist"));

        if (!passwordEncoder.matches(loginDTO.password(), user.getPassword())) {
            throw new RuntimeException("Password is not correct");
        }
        return new UserDTO(user.getId(), user.getName(), user.getEmail());
    }

}
