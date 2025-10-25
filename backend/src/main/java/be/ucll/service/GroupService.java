package be.ucll.service;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import be.ucll.model.Group;
import be.ucll.model.User;
import be.ucll.repository.GroupRepository;
import be.ucll.repository.UserRepository;
import be.ucll.util.exceptions.ServiceException;

@Service
public class GroupService {
    
    private GroupRepository groupRepository;
    private UserRepository userRepository;

    public GroupService(GroupRepository groupRepository,UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    public Group getGroupById(Long groupId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new ServiceException("Group not found", HttpStatus.NOT_FOUND));
        return group;
    }
    public List<Group>getAllGroups() {
        return groupRepository.findAll();
    }

    public Group createGroup(String name,Long userId) {
        if (groupRepository.findByNameIgnoreCase(name).isPresent()){
            throw new ServiceException("Group with name: '" + name + "' Already exists", HttpStatus.CONFLICT);
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));
        Group group = new Group(name);
        group.setOwner(user);
        group.addMember(user);
        return groupRepository.save(group);
    }

    public String deleteGroupById(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new ServiceException("Group not found", HttpStatus.NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));

        if (group.getOwner().getId() != user.getId()) {
            throw new ServiceException("You are not the group leader!", HttpStatus.FORBIDDEN);
        }
        groupRepository.delete(group);
        return "Group: " + group.getName() + " has been deleted!";
    }

    public Group joinGroupById(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new ServiceException("Group not found", HttpStatus.NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));

        if (group.getMembers().contains(user)) {
            throw new ServiceException("User is already in group : " + group.getName(), HttpStatus.CONFLICT);
        }
        group.addMember(user);
        return groupRepository.save(group);
    }

    public void leaveGroupById(Long groupId,Long userId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new ServiceException("Group not found", HttpStatus.NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));

        if (!group.getMembers().contains(user)) {
            throw new ServiceException("User is not part of group : " + group.getName() + " , so he cannot leave it!", HttpStatus.FORBIDDEN);
        }

        if (group.getOwner().getId().equals(user.getId())) {
            throw new ServiceException("Owner of the group may not leave the group!", HttpStatus.FORBIDDEN);
        }
        group.removeMember(user);
        groupRepository.save(group);
    }

    public List<Group> getJoinedGroupsByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));
        return user.getGroups();
    }



}
