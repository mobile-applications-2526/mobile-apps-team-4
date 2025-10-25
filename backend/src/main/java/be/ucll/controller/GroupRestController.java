package be.ucll.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import be.ucll.model.Group;
import be.ucll.service.GroupService;
import be.ucll.util.exceptions.DomainException;
import be.ucll.util.exceptions.ServiceException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
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
