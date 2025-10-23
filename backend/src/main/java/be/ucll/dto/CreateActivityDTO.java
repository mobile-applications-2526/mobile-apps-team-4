package be.ucll.dto;

import be.ucll.model.Icon;
import be.ucll.model.Location;
import java.time.LocalDateTime;

public record CreateActivityDTO(
        String name,
        Location location,
        Icon icon,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer maxAmountOfParticipants
) {}
