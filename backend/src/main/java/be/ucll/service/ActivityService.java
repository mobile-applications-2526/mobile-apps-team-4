package be.ucll.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import be.ucll.dto.CreateActivityDTO;
import be.ucll.model.Activity;
import be.ucll.model.Group;
import be.ucll.repository.ActivityRepository;
import be.ucll.repository.GroupRepository;
import be.ucll.repository.UserRepository;

@Service
public class ActivityService {
    private ActivityRepository activityRepository;
    private UserRepository userRepository;
    private GroupRepository groupRepository;

    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository, GroupRepository groupRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
    }

    public Optional<Activity> getActivityInfo(String activityName) {
        if (!activityRepository.findByNameIgnoreCase(activityName).isPresent()) {
            throw new RuntimeException("Activity does not exist");
        }
        return activityRepository.findByNameIgnoreCase(activityName);
    }

    public List<Activity>getAllActivities() {
        return activityRepository.findAll();
    }

    public Optional<Activity> getActivityById(Long id) {
        return activityRepository.findById(id);
    }    
}
