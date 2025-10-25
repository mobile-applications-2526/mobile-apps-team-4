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
        User barack = new User("Barack Obama", "barack@obama.com", passwordEncoder.encode("TheGoat123"));
        User joe = new User("Joe Biden", "joe@biden.com", passwordEncoder.encode("iForgotMyPassword"));
        User john = new User("John Doe", "john.doe@example.com", passwordEncoder.encode("IAmTheDoe"));
        User jane = new User("Jane Doe", "jane.doe@example.com", passwordEncoder.encode("IAmTheOtherDoe"));

        userRepository.save(barack);
        userRepository.save(joe);
        userRepository.save(john);
        userRepository.save(jane);

        // Groups
        Group groupPresidents = new Group("Presidents of the USA");
        groupPresidents.addMember(barack);
        groupPresidents.addMember(joe);
        groupPresidents.setOwner(barack);
        groupRepository.save(groupPresidents);

        Group groupDoe = new Group("John Doe's group");
        groupDoe.setOwner(john);
        groupDoe.addMember(joe);
        groupDoe.addMember(jane);
        groupRepository.save(groupDoe);

        // Activities
        Activity activityBowling = new Activity(
            "Bowling with the presidents",
            new Location(50.8734989, 4.7000437),
            new Icon(IconSymbolName.person_2_fill,IconColor.HEX_1A535C ),
            LocalDateTime.of(2025, 10, 21, 20, 30, 0),
            LocalDateTime.of(2025, 10, 21, 23, 30, 0)
        );
        activityBowling.setHostedBy(groupPresidents);
        activityBowling.addParticipant(barack);
        activityBowling.addParticipant(joe);

        Activity activityIceCream = new Activity(
            "Eating some CHOCOLATE ice cream",
            new Location(50.8777931, 4.7037686),
            new Icon(IconSymbolName.fork_knife, IconColor.HEX_4ECDC4),
            LocalDateTime.of(2025, 10, 22, 14, 0, 0),
            LocalDateTime.of(2025, 10, 22, 14, 30, 0)
        );
        activityIceCream.setHostedBy(groupPresidents);
        activityBowling.addParticipant(barack);
        activityBowling.addParticipant(joe);

        Activity activityStudy = new Activity(
            "Study session at KU Leuven Library",
            new Location(50.8746184, 4.7007859),
            new Icon(IconSymbolName.book_fill, IconColor.HEX_3A86FF),
            LocalDateTime.of(2025, 10, 23, 10, 0, 0),
            LocalDateTime.of(2025, 10, 23, 13, 0, 0)
        );
        activityStudy.setHostedBy(groupDoe);
        activityStudy.addParticipant(john);
        activityStudy.addParticipant(jane);

        Activity activityConcert = new Activity(
            "Open-air concert at Ladeuzeplein",
            new Location(50.8785877, 4.7064468),
            new Icon(IconSymbolName.music_note, IconColor.HEX_E71D36),
            LocalDateTime.of(2025, 10, 24, 19, 30, 0),
            LocalDateTime.of(2025, 10, 24, 22, 30, 0)
        );
        activityConcert.setHostedBy(groupDoe);
        activityConcert.addParticipant(john);
        activityConcert.addParticipant(jane);

        Activity activityBoardGames = new Activity(
            "Board games night in Kinepolis",
            new Location(50.881714, 4.7112156),
            new Icon(IconSymbolName.gamecontroller_fill, IconColor.HEX_8338EC),
            LocalDateTime.of(2025, 10, 26, 20, 0, 0),
            LocalDateTime.of(2025, 10, 26, 23, 0, 0)
        );
        activityBoardGames.setHostedBy(groupDoe);
        activityBoardGames.addParticipant(john);
        activityBoardGames.addParticipant(jane);

        activityRepository.save(activityBowling);
        activityRepository.save(activityIceCream);
        activityRepository.save(activityConcert);
        activityRepository.save(activityStudy);
        activityRepository.save(activityBoardGames);


    }
}
