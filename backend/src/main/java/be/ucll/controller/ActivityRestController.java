package be.ucll.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import be.ucll.dto.ActivityDTO;
import be.ucll.dto.CreateActivityDTO;
import be.ucll.service.ActivityService;
import be.ucll.util.exceptions.DomainException;
import be.ucll.util.exceptions.ServiceException;
import be.ucll.util.security.JwtUtils;

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
import org.springframework.web.bind.annotation.RequestBody;





@RestController
@RequestMapping("/activities")
public class ActivityRestController {
    private ActivityService activityService;
    private JwtUtils jwtUtils;
    
    public ActivityRestController(ActivityService activityService, JwtUtils jwtUtils) {
        this.activityService = activityService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("")
    public List<ActivityDTO> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/{id}")
    public Optional<ActivityDTO> getActivityById(@PathVariable Long id) {
        return activityService.getActivityById(id);
    }
    
    
    @GetMapping("/get-info/{activityName}") 
        public Optional<ActivityDTO> getActivityInfo(@PathVariable String activityName) {
            return activityService.getActivityInfo(activityName);
    }

    @PostMapping("/{groupId}") 
        public ActivityDTO createActivity(@RequestBody CreateActivityDTO activity, @PathVariable Long groupId) {
            Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return activityService.createActivity(groupId, userId, activity);
    }

    @DeleteMapping("/{activityId}")
    public String deleteActivity(@PathVariable Long activityId) {
        return activityService.deleteActivityById(activityId);
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
