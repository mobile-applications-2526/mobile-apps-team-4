package be.ucll.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "groups")
public class Group {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Group name is required")
    @Schema(example = "Presidents of the USA")
    private String name;

    @Schema(example = "Example of description : blablablablabla")
    private String description;

    @ManyToMany
    @JoinTable(
        name = "user_groups",
        joinColumns = @JoinColumn(name = "group_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> members = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "group_leader_id")
    private User owner;

    @ManyToMany
    @JoinTable(
        name = "user_invites",
        joinColumns = @JoinColumn(name = "group_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonManagedReference
    private List<User> invitedMembers = new ArrayList<>();

    protected Group() {}

    public Group(String name, String description) {
        this.name = name;
        this.description = description;
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

    public User getOwner() {
        return owner;
    }

    public List<User> getInvitedMembers() {
        return this.invitedMembers;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public void addMember(User user) {
        this.members.add(user);
        user.getGroups().add(this);
    }

    public void removeMember(User user) {
        this.members.remove(user);
        user.getGroups().remove(this);
    }

    public void setInvitedMembers(List<User> invitedMembers) {
        this.invitedMembers = invitedMembers;
    }

    public void removeInvitedMember(User user) {
        this.invitedMembers.remove(user);
    }

    public void inviteMember(User user) {
        this.invitedMembers.add(user);
        user.addInvite(this);
    }

    public void unInviteMembers(User user) {
        this.invitedMembers.remove(user);
        user.removeInvite(this);
    }

    public void setDescription(String d ) {
        this.description = d;
    }

    public String getDescription() {
        return this.description;
    }
}
