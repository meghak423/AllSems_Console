package com.edunexus.repository;

import com.edunexus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE EXISTS (SELECT ma FROM MentorArea ma WHERE ma.user = u)")
    List<User> findMentors();
}