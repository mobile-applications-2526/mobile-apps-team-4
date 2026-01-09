package unit.model;

import be.ucll.model.User;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import java.util.Set;
import java.util.stream.Collectors;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.Validation;
import jakarta.validation.Validator;

public class UserTest {
    private static ValidatorFactory validatorFactory;
    private static Validator validator;
    
    @BeforeAll
    public static void createValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();

    }
    
    @Test
    void givenValidValues_whenCreatingUser_thenUserIsCreatedWithThoseValues() {
        User user = new User("Barack Obama", "barack@obama.com", "TheGoat123");

        assertEquals("Barack Obama", user.getName());
        assertEquals("barack@obama.com", user.getEmail());
        assertEquals("TheGoat123", user.getPassword());
    }

    @Test
    void givenInvalidName_whenCreatingUser_thenCorrectErrorIsThrown() {
        User user = new User("", "barack@obama.com", "TheGoat123");

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertEquals(1, violations.size());
        assertEquals("Name is required", violations.iterator().next().getMessage());
    }

    @Test
    void givenInvalidEmail_whenCreatingUser_thenCorrectErrorIsThrown() {
        User user = new User("Barack Obama", "", "TheGoat123");

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertEquals(1, violations.size());
        assertEquals("Email is required", violations.iterator().next().getMessage());
    }

    @Test
    void givenInvalidPassword_whenCreatingUser_thenCorrectErrorIsThrown() {
        User user = new User("Barack Obama", "barack@obama.com", "");

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertEquals(1, violations.size());
        assertEquals("Password is required", violations.iterator().next().getMessage());
    }

    @Test
    void givenInvalidNameAndEmail_whenCreatingUser_thenCorrectErrorsAreThrown() {
        User user = new User("", "", "TheGoat123");

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        Set<String> messages = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toSet());

        assertEquals(2, violations.size());
        assertTrue(messages.contains("Name is required"));
        assertTrue(messages.contains("Email is required"));
    }

    @Test
    void givenInvalidNameAndPassword_whenCreatingUser_thenCorrectErrorsAreThrown() {
        User user = new User("", "barack@obama.com", "");

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        Set<String> messages = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toSet());

        assertEquals(2, violations.size());
        assertTrue(messages.contains("Name is required"));
        assertTrue(messages.contains("Password is required"));
    }

    @Test
    void givenInvalidEmailAndPassword_whenCreatingUser_thenCorrectErrorsAreThrown() {
        User user = new User("Barack Obama", "", "");

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        Set<String> messages = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toSet());

        assertEquals(2, violations.size());
        assertTrue(messages.contains("Email is required"));
        assertTrue(messages.contains("Password is required"));
    }

    @Test
    void givenInvalidNameAndEmailAndPassword_whenCreatingUser_thenCorrectErrorsAreThrown() {
        User user = new User("", "", "");

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        Set<String> messages = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toSet());

        assertEquals(3, violations.size());
        assertTrue(messages.contains("Name is required"));
        assertTrue(messages.contains("Email is required"));
        assertTrue(messages.contains("Password is required"));
    }

}
