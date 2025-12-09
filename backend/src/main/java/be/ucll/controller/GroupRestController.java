package be.ucll.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import be.ucll.dto.CreateGroupDTO;
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
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/groups")
public class GroupRestController {
    private GroupService groupService;

    public GroupRestController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/{id}")
    public Group getGroupById(@PathVariable Long id) {
       return groupService.getGroupById(id);
    }

    @GetMapping("/all")
    public List<Group>getAllGroups() {
        return groupService.getAllGroups();
    }

    @PostMapping("/create")
    public Group createGroup(@RequestBody CreateGroupDTO createGroupDTO) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return groupService.createGroup(createGroupDTO, userId);
    }

    @DeleteMapping("/{id}")
    public String deleteGroupById(@PathVariable Long id) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return groupService.deleteGroupById(id,userId);
    }

    @PutMapping("/leave/{id}")
    public void leaveGroupById(@PathVariable Long id) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        groupService.leaveGroupById(id, userId);
    }

    @GetMapping("/joined")
    public List<Group> getJoinedGroupsByUserId() {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return groupService.getJoinedGroupsByUserId(userId);
    }

    @PutMapping("/invite/{id}/{userId}")
    public Group inviteMember(@PathVariable Long id, @PathVariable Long userId) {
        return groupService.inviteMember(id,userId);
    }

    @PutMapping("/cancel-invite/{id}/{userId}")
    public void cancelInviteMember(@PathVariable Long id, @PathVariable Long userId) {
        groupService.cancelInviteMember(id,userId);
    }

    @PutMapping("/accept-invite/{id}")
    public void acceptInviteByGroupId(@PathVariable Long id) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        groupService.acceptInvite(id,userId);
    }

    @PutMapping("/decline-invite/{id}")
    public void declineInviteByGroupId(@PathVariable Long id) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        groupService.declineInvite(id,userId);
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
