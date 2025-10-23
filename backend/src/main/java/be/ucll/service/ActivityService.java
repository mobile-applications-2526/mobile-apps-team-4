package be.ucll.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import be.ucll.dto.ActivityDTO;
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

    public Optional<ActivityDTO> getActivityInfo(String activityName) {
        Optional<Activity>activity = activityRepository.findByNameIgnoreCase(activityName);
        if (activity.isEmpty()) {
            throw new RuntimeException("Activity does not exist");
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
            ActivityDTO activityDTO = new ActivityDTO(activity.get());
            return Optional.of(activityDTO);
        } else {
            return Optional.empty();
        }
    }

    public ActivityDTO createActivity(Long groupId, Long userId, CreateActivityDTO activityDTO) {

        Group group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Group not found"));

        if (group.getGroupLeader() == null || !group.getGroupLeader().getId().equals(userId)) {
            throw new RuntimeException("Only the group owner can create activities");
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
            return "This activity does not exist";
        }
        Activity activity = activityOpt.get();
        activityRepository.delete(activity);
        return "Activity " + activity.getName() + " has been deleted.";
}


}
