package be.ucll.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import be.ucll.dto.ActivityDTO;
import be.ucll.dto.CreateActivityDTO;
import be.ucll.model.Activity;
import be.ucll.model.Group;
import be.ucll.model.User;
import be.ucll.repository.ActivityRepository;
import be.ucll.repository.GroupRepository;
import be.ucll.repository.UserRepository;
import be.ucll.util.exceptions.ServiceException;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;

    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository, GroupRepository groupRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
    }

    public Optional<ActivityDTO> getActivityInfo(String activityName) {
        Optional<Activity> activity = activityRepository.findByNameIgnoreCase(activityName);
        if (activity.isEmpty()) {
            throw new ServiceException("Activity does not exist", HttpStatus.NOT_FOUND);
        }
        return activity.map(ActivityDTO::new);
    }

    public List<ActivityDTO> getAllActivities() {
        List<Activity> activities = activityRepository.findAll();
        List<ActivityDTO> activityDTOs = new ArrayList<>();

        for (Activity activity : activities) {
            activityDTOs.add(new ActivityDTO(activity));
        }

        return activityDTOs;
    }

    public Optional<ActivityDTO> getActivityById(Long id) {
        Optional<Activity> activity = activityRepository.findById(id);

        if (activity.isPresent()) {
            return Optional.of(new ActivityDTO(activity.get()));
        } else {
            throw new ServiceException("Activity not found", HttpStatus.NOT_FOUND);
        }
    }

    public ActivityDTO createActivity(Long groupId, Long userId, CreateActivityDTO activityDTO) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ServiceException("Group not found", HttpStatus.NOT_FOUND));

        if (group.getOwner() == null || !group.getOwner().getId().equals(userId)) {
            throw new ServiceException("Only the group owner can create activities", HttpStatus.FORBIDDEN);
        }

        Activity activity = new Activity(
                activityDTO.name(),
                activityDTO.location(),
                activityDTO.icon(),
                activityDTO.startDate(),
                activityDTO.endDate(),
                activityDTO.maxAmountOfParticipants()
        );
        activity.setHostedBy(group);
        Activity savedActivity = activityRepository.save(activity);
        return new ActivityDTO(savedActivity);
    }

    public String deleteActivityById(Long id) {
        Optional<Activity> activityOpt = activityRepository.findById(id);
        if (activityOpt.isEmpty()) {
            throw new ServiceException("Activity not found", HttpStatus.NOT_FOUND);
        }
        Activity activity = activityOpt.get();
        activityRepository.delete(activity);
        return "Activity " + activity.getName() + " has been deleted.";
    }

    public ActivityDTO joinActivityById(Long activityId, Long userId) {
        Activity activity = activityRepository.findById(activityId).orElseThrow(() -> new ServiceException("Activity not found", HttpStatus.NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));

        if (activity.getParticipants().contains(user)) {
            throw new ServiceException("User is already part of activity : " + activity.getName(), HttpStatus.CONFLICT);
        }
        activity.addParticipant(user);
        activityRepository.save(activity);
        return new ActivityDTO(activity);
    }

    public void leaveActivityById(Long activityId, Long userId) {
        Activity activity = activityRepository.findById(activityId).orElseThrow(() -> new ServiceException("Activity not found", HttpStatus.NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));

        if (!activity.getParticipants().contains(user)) {
            throw new ServiceException("User is not part of activity : " + activity.getName() + " , so he cannot leave it!", HttpStatus.FORBIDDEN);
        }

        activity.removeParticipant(user);
        activityRepository.save(activity);
    }

    public List<ActivityDTO> getJoinedActivitiesByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException("User not found", HttpStatus.NOT_FOUND));
        List<Activity> activities = user.getActivities();
        List<ActivityDTO> activityDTOs = new ArrayList<>();
        for (Activity activity : activities) {
            activityDTOs.add(new ActivityDTO(activity));
        }
        return activityDTOs;
    }

    
}
