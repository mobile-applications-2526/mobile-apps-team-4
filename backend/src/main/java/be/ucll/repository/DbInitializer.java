package be.ucll.repository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import be.ucll.model.User;
import jakarta.annotation.PostConstruct;

@Component
public class DbInitializer {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public DbInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void initialize() {
        // Users
        User barack = new User("Barack Obama", "Barack@Obama.com", passwordEncoder.encode("TheGoat123"));
        User joe = new User("Joe Biden", "Joe@Biden.com", passwordEncoder.encode("iForgotMyPassword"));

        userRepository.save(barack);
        userRepository.save(joe);
    }
}
