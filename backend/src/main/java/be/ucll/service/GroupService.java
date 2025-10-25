package be.ucll.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import be.ucll.model.Group;
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

    public Group createGroup(Group group) {
        if (groupRepository.findByNameIgnoreCase(group.getName()).isPresent()) {
            throw new ServiceException("Group with this name already exists", HttpStatus.CONFLICT);
        }
        return groupRepository.save(group);
    }

    public Optional<Group> getGroupInfo(String groupName) {
        if (!groupRepository.findByNameIgnoreCase(groupName).isPresent()) {
            throw new ServiceException("Could not find group with this name",HttpStatus.NOT_FOUND);
        } 
        return groupRepository.findByNameIgnoreCase(groupName);
    }


}
