package be.ucll.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import be.ucll.model.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group,Long> {
Optional<Group> findByNameIgnoreCase(String name);
}
