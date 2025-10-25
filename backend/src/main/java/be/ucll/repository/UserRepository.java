package be.ucll.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import be.ucll.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmailIgnoreCase(String email);
    List<User> findTop5ByEmailContainingIgnoreCaseOrNameContainingIgnoreCase(String email, String name);
}
