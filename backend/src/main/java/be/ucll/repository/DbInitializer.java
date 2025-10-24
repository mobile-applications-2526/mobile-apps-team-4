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

        userRepository.save(new User("User", "user@example.com", passwordEncoder.encode("ttt")));
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
            new Location(50.8754366, 4.7078728),
            new Icon(IconSymbolName.airplane,IconColor.HEX_1A535C ),
            LocalDateTime.of(2025, 10, 21, 20, 30, 0),
            LocalDateTime.of(2025, 10, 21, 23, 30, 0)
        );
        Activity activity2 = new Activity(
            "Cycling around Kessel-Lo Park",
            new Location(50.889210, 4.728630),
            new Icon(IconSymbolName.bicycle, IconColor.HEX_4ECDC4),
            LocalDateTime.of(2025, 10, 22, 14, 0, 0),
            LocalDateTime.of(2025, 10, 22, 16, 0, 0)
        );

        Activity activity3 = new Activity(
            "Study session at KU Leuven Library",
            new Location(50.877100, 4.701950),
            new Icon(IconSymbolName.book_fill, IconColor.HEX_3A86FF),
            LocalDateTime.of(2025, 10, 23, 10, 0, 0),
            LocalDateTime.of(2025, 10, 23, 13, 0, 0)
        );

        Activity activity4 = new Activity(
            "Open-air concert at Ladeuzeplein",
            new Location(50.879640, 4.701510),
            new Icon(IconSymbolName.music_note, IconColor.HEX_E71D36),
            LocalDateTime.of(2025, 10, 24, 19, 30, 0),
            LocalDateTime.of(2025, 10, 24, 22, 30, 0)
        );

        Activity activity5 = new Activity(
            "Dinner at Domus Brewery",
            new Location(50.878400, 4.701700),
            new Icon(IconSymbolName.fork_knife, IconColor.HEX_FF9F1C),
            LocalDateTime.of(2025, 10, 25, 18, 30, 0),
            LocalDateTime.of(2025, 10, 25, 21, 30, 0)
        );

        Activity activity6 = new Activity(
            "Board games night in Heverlee",
            new Location(50.864700, 4.689200),
            new Icon(IconSymbolName.gamecontroller_fill, IconColor.HEX_8338EC),
            LocalDateTime.of(2025, 10, 26, 20, 0, 0),
            LocalDateTime.of(2025, 10, 26, 23, 0, 0)
        );

        Activity activity7 = new Activity(
            "Painting workshop at STUK",
            new Location(50.875200, 4.700400),
            new Icon(IconSymbolName.paintpalette_fill, IconColor.HEX_FFBF69),
            LocalDateTime.of(2025, 10, 27, 17, 0, 0),
            LocalDateTime.of(2025, 10, 27, 19, 30, 0)
        );

        Activity activity8 = new Activity(
            "Evening run along the Dijle River",
            new Location(50.880800, 4.706700),
            new Icon(IconSymbolName.figure_run, IconColor.HEX_2EC4B6),
            LocalDateTime.of(2025, 10, 28, 18, 0, 0),
            LocalDateTime.of(2025, 10, 28, 19, 0, 0)
        );

        Activity activity9 = new Activity(
            "Film night at Cinema ZED",
            new Location(50.874700, 4.699400),
            new Icon(IconSymbolName.film_fill, IconColor.HEX_1A535C),
            LocalDateTime.of(2025, 10, 29, 21, 0, 0),
            LocalDateTime.of(2025, 10, 29, 23, 0, 0)
        );

        Activity activity10 = new Activity(
            "Yoga in the Botanical Garden",
            new Location(50.883800, 4.707000),
            new Icon(IconSymbolName.leaf_fill, IconColor.HEX_FFD93D),
            LocalDateTime.of(2025, 10, 30, 9, 30, 0),
            LocalDateTime.of(2025, 10, 30, 11, 0, 0)
        );

        Activity activity11 = new Activity(
            "Basketball tournament at Sportoase",
            new Location(50.873200, 4.721500),
            new Icon(IconSymbolName.basketball_fill, IconColor.HEX_FF6B6B),
            LocalDateTime.of(2025, 10, 31, 15, 0, 0),
            LocalDateTime.of(2025, 10, 31, 18, 0, 0)
        );

        Activity activity12 = new Activity(
            "Photography walk through Leuven center",
            new Location(50.879200, 4.703800),
            new Icon(IconSymbolName.camera_fill, IconColor.HEX_3A86FF),
            LocalDateTime.of(2025, 11, 1, 14, 0, 0),
            LocalDateTime.of(2025, 11, 1, 17, 0, 0)
        );

        activity1.setHostedBy(group1);
        activity2.setHostedBy(group1);
        activity3.setHostedBy(group1);
        activity4.setHostedBy(group1);
        activity5.setHostedBy(group1);
        activity6.setHostedBy(group1);
        activity7.setHostedBy(group1);
        activity8.setHostedBy(group1);
        activity9.setHostedBy(group1);
        activity10.setHostedBy(group1);
        activity11.setHostedBy(group1);
        activity12.setHostedBy(group1);

        activity1.addParticipant(joe);
        activity2.addParticipant(joe);
        activity3.addParticipant(joe);
        activity4.addParticipant(joe);
        activity5.addParticipant(joe);
        activity6.addParticipant(joe);
        activity7.addParticipant(joe);
        activity8.addParticipant(joe);
        activity9.addParticipant(joe);
        activity10.addParticipant(joe);
        activity11.addParticipant(joe);
        activity12.addParticipant(joe);

        activity1.addParticipant(barack);
        activity2.addParticipant(barack);
        activity3.addParticipant(barack);
        activity4.addParticipant(barack);
        activity5.addParticipant(barack);
        activity6.addParticipant(barack);
        activity7.addParticipant(barack);
        activity8.addParticipant(barack);
        activity9.addParticipant(barack);
        activity10.addParticipant(barack);
        activity11.addParticipant(barack);
        activity12.addParticipant(barack);

        activityRepository.save(activity1);
        activityRepository.save(activity2);
        activityRepository.save(activity3);
        activityRepository.save(activity4);
        activityRepository.save(activity5);
        activityRepository.save(activity6);
        activityRepository.save(activity7);
        activityRepository.save(activity8);
        activityRepository.save(activity9);
        activityRepository.save(activity10);
        activityRepository.save(activity11);
        activityRepository.save(activity12);

        // Other stuff

        group1.addMember(joe);
        group1.addMember(barack);
        groupRepository.save(group1);
        userRepository.save(barack);
        userRepository.save(joe);

    }
}
