package be.ucll.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import be.ucll.model.Activity;
import be.ucll.service.ActivityService;
import be.ucll.util.security.JwtUtils;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



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
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }
    
    @GetMapping("/get-info/{activityName}")
    public Optional<Activity> getActivityInfo(@PathVariable String activityName) {
        return activityService.getActivityInfo(activityName);
    }

}
