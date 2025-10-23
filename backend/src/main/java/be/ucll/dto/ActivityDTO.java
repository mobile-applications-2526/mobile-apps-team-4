package be.ucll.dto;
import be.ucll.model.Activity;
import be.ucll.model.Icon;
import be.ucll.model.Location;

import java.time.LocalDateTime;
import java.util.List;

public record ActivityDTO(
        Long id,
        String name,
        Location location,
        IconDTO icon,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer maxAmountOfParticipants,
        List<Long> participantIds,
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
                activity.getParticipants().stream().map(p -> p.getId()).toList(),
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

