package be.ucll.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import be.ucll.model.Group;
import be.ucll.service.GroupService;
import be.ucll.util.exceptions.DomainException;
import be.ucll.util.exceptions.ServiceException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/groups")
public class GroupRestController {
    private GroupService groupService;

    public GroupRestController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/{groupId}")
    public Group getGroupById(@PathVariable Long groupId) {
       return groupService.getGroupById(groupId);
    }

    @GetMapping("/all")
    public List<Group>getAllGroups() {
        return groupService.getAllGroups();
    }

    @PostMapping("/create")
    public Group createGroup(@RequestParam String name) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return groupService.createGroup(name,userId);
    }

    @DeleteMapping("/{groupId}")
    public String deleteGroupById(@PathVariable Long groupId) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return groupService.deleteGroupById(groupId,userId);
    }
    
    @PutMapping("/join/{groupId}")
    public Group joinGroupById(@PathVariable Long groupId) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return groupService.joinGroupById(groupId, userId);
    }

    @PutMapping("/leave/{groupId}")
    public void leaveGroupById(@PathVariable Long groupId) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        groupService.leaveGroupById(groupId, userId);
    }

    @GetMapping("/joined")
    public List<Group> getJoinedGroupsByUserId() {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return groupService.getJoinedGroupsByUserId(userId);
    }
    
    
    @ExceptionHandler(DomainException.class)
    public ResponseEntity<Map<String, Object>> handleDomainException(DomainException ex) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("errorCode", ex.getStatus().value() + " " + ex.getStatus());
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("type", "DomainException");
        return ResponseEntity.status(ex.getStatus()).body(errorResponse);
    }

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<Map<String, Object>> handleServiceException(ServiceException ex) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("errorCode", ex.getStatus().value() + " " + ex.getStatus());
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("type", "ServiceException");
        return ResponseEntity.status(ex.getStatus()).body(errorResponse);
    }
}
