package unit.model;

import be.ucll.model.Location;

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

public class LocationTest {
    private static ValidatorFactory validatorFactory;
    private static Validator validator;
    
    @BeforeAll
    public static void createValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();

    }

    @Test
    public void givenvalidValues_whenCreatingLocation_thenLocationIsCreated() {
        Location location = new Location(50.8778745, 4.6994948);

        assertEquals(50.8778745, location.getLatitude());
        assertEquals(4.6994948, location.getLongitude());
    }

    @Test
    public void givenInvalidLattitude_whenCreatingLocatin_thenErrorIsThrown() {
        Location location = new Location(null, 4.6994948);

        Set<ConstraintViolation<Location>> violations = validator.validate(location);
        assertEquals(1, violations.size());
        assertEquals("Latitude cannot be null", violations.iterator().next().getMessage());
    }

    @Test
    public void givenInvalidLongitude_whenCreatingLocatin_thenErrorIsThrown() {
        Location location = new Location(4.25458, null);

        Set<ConstraintViolation<Location>> violations = validator.validate(location);
        assertEquals(1, violations.size());
        assertEquals("Longitude cannot be null", violations.iterator().next().getMessage());
    }

    @Test
    public void givenInvalidLattitudeAndLongitude_whenCreatingLocatin_thenErrorsAreThrown() {
        Location location = new Location(null, null);

        Set<ConstraintViolation<Location>> violations = validator.validate(location);
        Set<String> messages = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toSet());

        assertEquals(2, violations.size());
        assertTrue(messages.contains("Latitude cannot be null"));
        assertTrue(messages.contains("Longitude cannot be null"));
    }
}
