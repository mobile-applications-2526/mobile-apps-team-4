package be.ucll.repository;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import be.ucll.model.Activity;
import be.ucll.model.Group;
import be.ucll.model.Icon;
import be.ucll.model.Location;
import be.ucll.model.User;
import be.ucll.model.Icon.IconColor;
import be.ucll.model.Icon.IconSymbolName;
import jakarta.annotation.PostConstruct;

@Component
public class DbInitializer {
    private UserRepository userRepository;
    private GroupRepository groupRepository;
    private ActivityRepository activityRepository;
    private PasswordEncoder passwordEncoder;

    public DbInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder, GroupRepository groupRepository, ActivityRepository activityRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.groupRepository = groupRepository;
        this.activityRepository = activityRepository;
    }

    @PostConstruct
    public void initialize() {
        // Users
        User barack = new User("Barack Obama", "Barack@Obama.com", passwordEncoder.encode("TheGoat123"));
        User joe = new User("Joe Biden", "Joe@Biden.com", passwordEncoder.encode("iForgotMyPassword"));

        userRepository.save(barack);
        userRepository.save(joe);

        // Groups
        Group group1 = new Group("Presidents of the USA");
        groupRepository.save(group1);
        group1.setGroupLeader(barack);
        groupRepository.save(group1);

        // Activities
        Activity activity1 = new Activity(
            "Bowling with the presidents",
            new Location(12.5, 20.5),
            new Icon(IconSymbolName.airplane,IconColor.HEX_1A535C ),
            LocalDateTime.of(2025, 10, 21, 20, 30, 0),
            LocalDateTime.of(2025, 10, 21, 23, 30, 0)
        );
        activity1.setHostedBy(group1);
        activity1.addParticipant(barack);
        activity1.addParticipant(joe);
        activityRepository.save(activity1);

        // Other stuff

        group1.addMember(joe);
        group1.addMember(barack);
        groupRepository.save(group1);
        userRepository.save(barack);
        userRepository.save(joe);

    }
}
