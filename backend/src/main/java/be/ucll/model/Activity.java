package be.ucll.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "activities")
public class Activity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Activity must have a name")
    private String name;

    @NotNull(message = "Activity must have a location")
    @Embedded
    private Location location;

    @NotNull(message = "Activity must have an icon")
    @Embedded
    private Icon icon;

    @NotNull(message = "Activity must have a startDate")
    @Column(name = "start_date")
    private LocalDateTime startDate;

    @NotNull(message = "Activity must have an endDate")
    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "max_amount_of_participants")
    private Integer maxAmountOfParticipants;

    @ManyToMany
    @JoinTable(
        name = "activity_participants",
        joinColumns = @JoinColumn(name = "activity_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> participants = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "hosted_by_group_id")
    private Group hostedBy;

    protected Activity() {}

    public Activity(String name, Location location, Icon icon, LocalDateTime startDate, LocalDateTime endDate) {
        setName(name);
        setLocation(location);
        setIcon(icon);
        setStartDate(startDate);
        setEndDate(endDate);
    }

    public Activity(String name, Location location, Icon icon, LocalDateTime startDate, LocalDateTime endDate, Integer maxAmountOfParticipants) {
        setName(name);
        setLocation(location);
        setIcon(icon);
        setStartDate(startDate);
        setEndDate(endDate);
        setMaxAmountOfParticipants(maxAmountOfParticipants);
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public void setIcon(Icon icon) {
        this.icon = icon;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public void setMaxAmountOfParticipants(Integer max) {
        this.maxAmountOfParticipants = max;
    }

    public void setParticipants(List<User> participants) {
        this.participants = participants;
    }

    public void addParticipant(User user) {
        if (!this.participants.contains(user)) {
            this.participants.add(user);
            user.getActivities().add(this);
        }
    }

    public void removeParticipant(User user) {
        this.participants.remove(user);
        user.getActivities().remove(this);
    }

    public void setHostedBy(Group hostedBy) {
        this.hostedBy = hostedBy;
    }

    // Getters
    public String getName() {
        return this.name;
    }

    public Location getLocation() {
        return this.location;
    }

    public Icon getIcon() {
        return this.icon;
    }

    public LocalDateTime getStartDate() {
        return this.startDate;
    }

    public LocalDateTime getEndDate() {
        return this.endDate;
    }

    public Integer getMaxAmountOfParticipants() {
        return this.maxAmountOfParticipants;
    }

    public List<User> getParticipants() {
        return this.participants;
    }

    public Group getHostedBy() {
        return this.hostedBy;
    }

    public Long getId() {
        return this.id;
    }
}
