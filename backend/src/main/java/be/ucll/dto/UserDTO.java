package be.ucll.dto;
import java.util.List;
import be.ucll.model.User;

public record UserDTO(String name, String email, Long id, List<BasicGroupDTO> invites) {
    public UserDTO(User user) {
        this(
            user.getName(),
            user.getEmail(),
            user.getId(),
            user.getInvites().stream().map(group -> new BasicGroupDTO(group.getId(), group.getName())).toList()
        );
    }
}