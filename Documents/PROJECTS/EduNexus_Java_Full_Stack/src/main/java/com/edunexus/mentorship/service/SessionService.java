package com.edunexus.mentorship.service;

import com.edunexus.mentorship.model.SessionRequest;
import com.edunexus.mentorship.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    public List<SessionRequest> getAllSessions() {
        return sessionRepository.findAll();
    }

    public SessionRequest getSessionById(Long id) {
        return sessionRepository.findById(id).orElse(null);
    }

    public SessionRequest createSession(SessionRequest sessionRequest) {
        sessionRequest.setStatus("Pending");
        return sessionRepository.save(sessionRequest);
    }

    public SessionRequest updateStatus(Long id, String status) {
        SessionRequest session = sessionRepository.findById(id).orElse(null);
        if (session != null) {
            session.setStatus(status);
            return sessionRepository.save(session);
        }
        return null;
    }

    public void deleteSession(Long id) {
        sessionRepository.deleteById(id);
    }
}
