package be.ucll.dto;
import be.ucll.model.Activity;
import be.ucll.model.Icon;
import be.ucll.model.Location;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.List;

public record ActivityDTO(
        Long id,

        @Schema(example = "Drinking with the pres")
        String name,

        Location location,
        IconDTO icon,
        LocalDateTime startDate,
        LocalDateTime endDate,

        @Schema(example = "10")
        Integer maxAmountOfParticipants,

        @Schema(example = "[0, 1]")
        List<String> participants,
        Long hostedByGroupId
) {
    public ActivityDTO(Activity activity) {
        this(
                activity.getId(),
                activity.getName(),
                activity.getLocation(),
                new IconDTO(activity.getIcon()),
                activity.getStartDate(),
                activity.getEndDate(),
                activity.getMaxAmountOfParticipants(),
                activity.getParticipants().stream().map(p -> p.getName()).toList(),
                activity.getHostedBy() != null ? activity.getHostedBy().getId() : null
        );
    }

    public record IconDTO(String name, String color) {
        public IconDTO(Icon icon) {
            this(
                icon.getIconSymbolName().name().replace("_", "."),
                icon.getIconColor().getHex()
            );
        }
    }
}

