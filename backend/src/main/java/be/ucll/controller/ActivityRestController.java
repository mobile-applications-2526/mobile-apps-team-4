package be.ucll.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import be.ucll.dto.ActivityDTO;
import be.ucll.dto.CreateActivityDTO;
import be.ucll.service.ActivityService;
import be.ucll.util.exceptions.DomainException;
import be.ucll.util.exceptions.ServiceException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
@RequestMapping("/activities")
public class ActivityRestController {
    private ActivityService activityService;
    
    public ActivityRestController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/all")
    public List<ActivityDTO> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/{id}")
    public Optional<ActivityDTO> getActivityById(@PathVariable Long id) {
        return activityService.getActivityById(id);
    }

    @GetMapping("/group/{hostedBy}")
    public List<ActivityDTO> getAllActivitiesFromGroup(@PathVariable Long hostedBy) {
        return activityService.getAllActivitiesFromGroup(hostedBy);
    }
    
    @PostMapping("/create/{groupId}") 
        public ActivityDTO createActivity(@RequestBody CreateActivityDTO activity, @PathVariable Long groupId) {
            Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return activityService.createActivity(groupId, userId, activity);
    }

    @DeleteMapping("/{activityId}")
    public String deleteActivity(@PathVariable Long activityId) {
        return activityService.deleteActivityById(activityId);
    }

    @PutMapping("/join/{ActivityId}")
    public ActivityDTO joinActivityById(@PathVariable Long activityId) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return activityService.joinActivityById(activityId, userId);
    }

    @PutMapping("/leave/{activityId}")
    public void leaveActivityById(@PathVariable Long activityId) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        activityService.leaveActivityById(activityId, userId);
    }

    @GetMapping("/joined")
    public List<ActivityDTO> getJoinedActivitiesByUserId() {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return activityService.getJoinedActivitiesByUserId(userId);
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
        errorResponse.put("errorCode", ex.getStatus().value());
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("type", "ServiceException");
        return ResponseEntity.status(ex.getStatus()).body(errorResponse);
    }

    



}
