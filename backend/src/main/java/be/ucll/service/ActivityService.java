package be.ucll.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import be.ucll.model.Activity;
import be.ucll.repository.ActivityRepository;
import be.ucll.repository.UserRepository;

@Service
public class ActivityService {
    private ActivityRepository activityRepository;
    private UserRepository userRepository;

    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    public Optional<Activity> getActivityInfo(String activityName) {
        if (!activityRepository.findByNameIgnoreCase(activityName).isPresent()) {
            throw new RuntimeException("Activity does not exist");
        }
        return activityRepository.findByNameIgnoreCase(activityName);
    }
}
