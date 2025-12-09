package be.ucll.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "users")
public class User{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name is required")
    @Schema(example = "Barack Obama")
    private String name;

    @Email
    @NotNull(message = "User is required")
    @Schema(example = "barack@obama.com")
    private String email;

    @NotNull(message = "Password is required")
    @JsonIgnore
    @Schema(example = "TheGoat123")
    private String password;

    @ManyToMany(mappedBy = "members")
    @JsonIgnore
    private List<Group> groups = new ArrayList<>();

    @ManyToMany(mappedBy = "participants")
    @JsonIgnore
    private List<Activity> activities = new ArrayList<>();

    @ManyToMany(mappedBy = "invitedMembers")
    @JsonBackReference
    private List<Group> invites = new ArrayList<>();

    protected User() {}

    public User(String name, String email, String password) {
        setName(name);
        setEmail(email);
        setPassword(password);
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setGroups(List<Group> groups) {
        this.groups = groups;
    }

    public void addGroup(Group group) {
        this.groups.add(group);
    }

    public void removeGroup(Group group) {
        this.groups.remove(group);
    }

    public void setActivities(List<Activity>activities) {
        this.activities = activities;
    }

    public void setInvites(List<Group>invites) {
        this.invites = invites;
    }

    public void addInvite(Group group) {
        this.invites.add(group);
    }

    public void acceptInvite(Group group) {
        this.invites.remove(group);
        group.addMember(this);
        group.removeInvitedMember(this);
    }

    public void declineInvite(Group group) {
        this.invites.remove(group);
        group.removeInvitedMember(this);
    }
    public void removeInvite(Group group) {
        this.invites.remove(group);
    }



    // Getters
    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public List<Group> getGroups() {
        return this.groups;
    }

    public List<Activity> getActivities() {
        return this.activities;
    }

    public List<Group> getInvites() {
        return this.invites;
    }
}
