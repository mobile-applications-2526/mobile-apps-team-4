package be.ucll.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import be.ucll.model.Group;
import be.ucll.service.GroupService;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/groups")
public class GroupRestController {
    private GroupService groupService;

    public GroupRestController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/getInfo/{groupName}")
    public Optional<Group> getGroupInfo(@PathVariable String groupName) {
       return groupService.getGroupInfo(groupName);
    }
}
