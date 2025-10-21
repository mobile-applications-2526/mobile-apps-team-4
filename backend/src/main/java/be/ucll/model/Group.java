package be.ucll.model;

import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "groups")
public class Group {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Group name is required")
    private String name;

    @ManyToMany
    @JoinTable(
        name = "user_groups",
        joinColumns = @JoinColumn(name = "group_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> members = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "group_leader_id")
    private User groupLeader;

    protected Group() {}

    public Group(String name) {
        this.name = name;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<User> getMembers() {
        return members;
    }

    public User getGroupLeader() {
        return groupLeader;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public void setGroupLeader(User groupLeader) {
        this.groupLeader = groupLeader;
    }

    public void addMember(User user) {
        this.members.add(user);
        user.getGroups().add(this);
    }

    public void removeMember(User user) {
        this.members.remove(user);
        user.getGroups().remove(this);
    }
}
