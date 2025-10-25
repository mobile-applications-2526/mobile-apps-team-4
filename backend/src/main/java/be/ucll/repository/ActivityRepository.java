package be.ucll.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import be.ucll.model.Activity;

@Repository
public interface ActivityRepository extends JpaRepository<Activity,Long> {
    Optional<Activity> findByNameIgnoreCase(String name);
    List<Activity> findByHostedBy_Id(Long groupId);
}
