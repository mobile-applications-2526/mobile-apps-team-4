package be.ucll.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import be.ucll.model.Activity;
import be.ucll.service.ActivityService;

import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/activities")
public class ActivityRestController {
    private ActivityService activityService;
    
    public ActivityRestController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/getInfo/{activityName}")
    public Optional<Activity> getActivityInfo(@PathVariable String activityName) {
        return activityService.getActivityInfo(activityName);
    }
    
}
