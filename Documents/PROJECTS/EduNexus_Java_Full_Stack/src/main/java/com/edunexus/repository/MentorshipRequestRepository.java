package com.edunexus.repository;

import com.edunexus.model.MentorshipRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorshipRequestRepository extends JpaRepository<MentorshipRequest, Long> {
    List<MentorshipRequest> findByStatus(MentorshipRequest.MentorshipStatus status);
}