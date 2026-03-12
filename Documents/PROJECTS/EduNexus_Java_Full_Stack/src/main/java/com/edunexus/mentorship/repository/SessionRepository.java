package com.edunexus.mentorship.repository;

import com.edunexus.mentorship.model.SessionRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<SessionRequest, Long> {
}