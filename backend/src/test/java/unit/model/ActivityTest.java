package unit.model;

import be.ucll.model.User;
import be.ucll.model.Icon.IconColor;
import be.ucll.model.Icon.IconSymbolName;
import be.ucll.model.Activity;
import be.ucll.model.Group;
import be.ucll.model.Icon;
import be.ucll.model.Location;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.Validation;
import jakarta.validation.Validator;

public class ActivityTest {
    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    User user1 = new User("Barack Obama", "barack@obama.com", "TheGoat123");
    User user2 = new User("Joe Biden", "joe@biden.com", "Soda!!!");
    User user3 = new User("Donald Trum", "donald@trump.com", "Obamna321");

    Icon icon = new Icon(IconSymbolName.graduationcap_fill, IconColor.HEX_E71D36);

    LocalDateTime localDateTime1 = LocalDateTime.of(2025, 11, 24, 14, 0);
    LocalDateTime localDateTime2 = LocalDateTime.of(2025, 11, 24, 19, 0);

    Location location1 = new Location(50.8778745, 4.6994948);

    Group group = new Group("Presidents of the USA", "The great leaders of America united.");

    
    @BeforeAll
    public static void createValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();

    }

    @Test
    public void givenValidValuesForActivity_whenCreatingActivity_thenActivityIsCreated() {
        Activity activity = new Activity("president hang out", location1, icon, localDateTime1 ,localDateTime2 , 55);
    
        assertEquals("president hang out", activity.getName());
        assertEquals(location1, activity.getLocation());
        assertEquals(icon, activity.getIcon());
        assertEquals(localDateTime1, activity.getStartDate());
        assertEquals(localDateTime2, activity.getEndDate());
        assertEquals(55, activity.getMaxAmountOfParticipants());
    }

    @Test
    public void givenValidUsers_whenAddingUsersToActivity_thenUsersAreAddedToActivity() {
        Activity activity = new Activity("president hang out", location1, icon, localDateTime1 ,localDateTime2 , 55);

        activity.addParticipant(user1);
        activity.addParticipant(user2);
        activity.addParticipant(user3);

        List<User> participants = activity.getParticipants();

        assertTrue(participants.contains(user1));
        assertTrue(participants.contains(user2));
        assertTrue(participants.contains(user3));
    }

    @Test
    public void givenSameUserTwice_whenAddingUsersToActivity_thenUserIsOnlyAddedOnce() {
        Activity activity = new Activity("president hang out", location1, icon, localDateTime1 ,localDateTime2 , 55);

        activity.addParticipant(user1);
        activity.addParticipant(user2);
        activity.addParticipant(user3);
        activity.addParticipant(user1);

        List<User> participants = activity.getParticipants();

        assertEquals(3, participants.size());
    }

    @Test
    public void givenParticipatingUser_whenRemovingUser_thenUserIsRemoved() {
        Activity activity = new Activity("president hang out", location1, icon, localDateTime1 ,localDateTime2 , 55);

        activity.addParticipant(user1);
        activity.addParticipant(user2);
        activity.addParticipant(user3);

        List<User> participantsBeforeRemoving = activity.getParticipants();

        assertEquals(3, participantsBeforeRemoving.size());
        assertTrue(participantsBeforeRemoving.contains(user1));

        activity.removeParticipant(user1);
        List<User> participantsAfterRemoving = activity.getParticipants();

        assertEquals(2, participantsAfterRemoving.size());
        assertFalse(participantsAfterRemoving.contains(user1));
    }

    @Test
    public void givenValidGroup_whenAddingHostedBy_thenGroupIsAddedToHostedBy() {
        Activity activity = new Activity("president hang out", location1, icon, localDateTime1 ,localDateTime2 , 55);

        activity.setHostedBy(group);

        assertEquals(group, activity.getHostedBy());
    }

    @Test
    public void givenInvalidName_whenCreatingActivity_thenErrorsAreThrown() {
        Activity activity = new Activity(null, location1, icon, localDateTime1 ,localDateTime2 , 55);

        Set<ConstraintViolation<Activity>> violations = validator.validate(activity);
        Set<String> messages = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toSet());

        assertEquals(1, violations.size());
        assertTrue(messages.contains("Activity must have a name"));
    }

    @Test
    public void givenInvalidLocation_whenCreatingActivity_thenErrorsAreThrown() {
        Activity activity = new Activity("president hang out", null, icon, localDateTime1 ,localDateTime2 , 55);

        Set<ConstraintViolation<Activity>> violations = validator.validate(activity);
        Set<String> messages = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toSet());

        assertEquals(1, violations.size());
        assertTrue(messages.contains("Activity must have a location"));
    }

    @Test
    public void givenInvalidIcon_whenCreatingActivity_thenErrorsAreThrown() {
        Activity activity = new Activity("president hang out", location1, null, localDateTime1 ,localDateTime2 , 55);

        Set<ConstraintViolation<Activity>> violations = validator.validate(activity);
        Set<String> messages = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toSet());

        assertEquals(1, violations.size());
        assertTrue(messages.contains("Activity must have an icon"));
    }

    @Test
    public void givenInvalidStartDate_whenCreatingActivity_thenErrorsAreThrown() {
        Activity activity = new Activity("president hang out", location1, icon, null ,localDateTime2 , 55);

        Set<ConstraintViolation<Activity>> violations = validator.validate(activity);
        Set<String> messages = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toSet());

        assertEquals(1, violations.size());
        assertTrue(messages.contains("Activity must have a startDate"));
    }

    @Test
    public void givenInvalidEndDate_whenCreatingActivity_thenErrorsAreThrown() {
        Activity activity = new Activity("president hang out", location1, icon, localDateTime1 ,null , 55);

        Set<ConstraintViolation<Activity>> violations = validator.validate(activity);
        Set<String> messages = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toSet());

        assertEquals(1, violations.size());
        assertTrue(messages.contains("Activity must have an endDate"));
    }
}