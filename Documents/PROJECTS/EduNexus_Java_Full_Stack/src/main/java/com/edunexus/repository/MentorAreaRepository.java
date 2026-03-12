package com.edunexus.repository;

import com.edunexus.model.MentorArea;
import com.edunexus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorAreaRepository extends JpaRepository<MentorArea, Long> {
    List<MentorArea> findByUser(User user);
}