package be.ucll.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import be.ucll.model.Group;
import be.ucll.repository.GroupRepository;
import be.ucll.repository.UserRepository;

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
            throw new RuntimeException("Group with this name already exists");
        }
        return groupRepository.save(group);
    }

    public Optional<Group> getGroupInfo(String groupName) {
        if (!groupRepository.findByNameIgnoreCase(groupName).isPresent()) {
            throw new RuntimeException("Group with this name already exists");
        } 
        return groupRepository.findByNameIgnoreCase(groupName);
    }


}
