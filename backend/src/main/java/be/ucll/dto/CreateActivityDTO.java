package be.ucll.dto;

import be.ucll.model.Icon;
import be.ucll.model.Location;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public record CreateActivityDTO(
    @Schema(example = "Drinking with the pres")
    String name,

    Location location,
    Icon icon,

    @Schema(
        type = "string",
        format = "date-time",
        example = "2025-10-21T20:30:00"
    )
    LocalDateTime startDate,

    @Schema(
        type = "string",
        format = "date-time",
        example = "2025-10-21T22:00:00"
    )
    LocalDateTime endDate,

    @Schema(example = "10")
    Integer maxAmountOfParticipants
) {}
