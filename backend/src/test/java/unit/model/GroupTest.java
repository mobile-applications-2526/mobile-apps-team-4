package unit.model;

import be.ucll.model.User;
import be.ucll.model.Group;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.Validation;
import jakarta.validation.Validator;

public class GroupTest {
    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    User user1 = new User("Barack Obama", "barack@obama.com", "TheGoat123");
    User user2 = new User("Joe Biden", "joe@biden.com", "Soda!!!");
    User user3 = new User("Donald Trum", "donald@trump.com", "Obamna321");
    
    @BeforeAll
    public static void createValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();

    }
    
    @Test
    public void givenvalidName_whenCreatingGroup_thenGroupIsCreatedWithThatName() {
        Group group = new Group("Presidents of the USA");

        assertEquals("Presidents of the USA", group.getName());
    }

    @Test
    public void givenValidValuesForMembers_whenSettingMembers_ThenUsersAreAddedToTheGroup() {
        Group group = new Group("Presidents of the USA");

        group.addMember(user1);
        group.addMember(user2);
        group.addMember(user3);

        List<User> members = group.getMembers();

        assertTrue(members.contains(user1));
        assertTrue(members.contains(user2));
        assertTrue(members.contains(user3));
    }

    @Test
    public void givenValidValueForOwner_whenSetting_ThenOwnerIsAddedToTheGroup() {
        Group group = new Group("Presidents of the USA");

        group.setOwner(user1);

        assertEquals(user1, group.getOwner());
    }

    @Test
    public void givenInvalidName_whenCreating_thenErrorIsThrown() {
        Group group = new Group("");

        Set<ConstraintViolation<Group>> violations = validator.validate(group);
        Set<String> messages = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toSet());

        assertEquals(1, violations.size());
        assertTrue(messages.contains("Group name is required"));
    }

}
