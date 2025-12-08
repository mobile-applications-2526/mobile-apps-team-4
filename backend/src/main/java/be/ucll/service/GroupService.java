package be.ucll.service;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import be.ucll.dto.CreateGroupDTO;
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

    public Group createGroup(CreateGroupDTO createGroupDTO, Long userId) {
        if (groupRepository.findByNameIgnoreCase(createGroupDTO.name()).isPresent()){
            throw new ServiceException("Group with name: '" + createGroupDTO.name() + "' Already exists", HttpStatus.CONFLICT);
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));
        Group group = new Group(createGroupDTO.name());
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

    public Group inviteMember(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new ServiceException("Group not found", HttpStatus.NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));

        if (group.getOwner().getId() == userId) {
            throw new ServiceException("Only the owner of the group can send an invite", HttpStatus.UNAUTHORIZED);
        }

        if (group.getMembers().contains(user)) {
            throw new ServiceException("Cannot invite a member that is already part of the group",HttpStatus.CONFLICT);
        }

        if (group.getInvitedMembers().contains(user)) {
            throw new ServiceException("This user is already invited!", HttpStatus.CONFLICT);
            
        }

        group.inviteMember(user);
        groupRepository.save(group);
        userRepository.save(user);
        return group;
    }

    public void cancelInviteMember(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new ServiceException("Group not found", HttpStatus.NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));
        
        if (group.getOwner().getId() == userId) {
            throw new ServiceException("Only the owner of the group can cancel an invite", HttpStatus.UNAUTHORIZED);
        }

        if (!group.getInvitedMembers().contains(user)) {
            throw new ServiceException("Can't cancel an invite if the user was not invited", HttpStatus.CONFLICT);
        }
        group.unInviteMembers(user);
        groupRepository.save(group);
        userRepository.save(user);
    }

    public void acceptInvite(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new ServiceException("Group not found", HttpStatus.NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));
        
        if (!group.getInvitedMembers().contains(user)) {
            throw new ServiceException("Can't accept an invite if you were not invited!", HttpStatus.CONFLICT);
        }

        if (group.getMembers().contains(user)) {
            throw new ServiceException("Can't accept an invite to a group you are already part of!", HttpStatus.CONFLICT);
        }
        user.acceptInvite(group);
        groupRepository.save(group);
        userRepository.save(user);
    }

    public void declineInvite(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new ServiceException("Group not found", HttpStatus.NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));
        
        if (!group.getInvitedMembers().contains(user)) {
            throw new ServiceException("Can't decline an invite if you were not invited!", HttpStatus.CONFLICT);
        }

        if (group.getMembers().contains(user)) {
            throw new ServiceException("Can't decline an invite to a group you are part of!", HttpStatus.CONFLICT);
        }

        user.declineInvite(group);
        groupRepository.save(group);
        userRepository.save(user);
    } 



}
