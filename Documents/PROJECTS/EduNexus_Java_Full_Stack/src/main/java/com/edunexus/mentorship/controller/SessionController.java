package com.edunexus.mentorship.controller;

import com.edunexus.mentorship.model.SessionRequest;
import com.edunexus.mentorship.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @GetMapping
    public List<SessionRequest> getAllSessions() {
        return sessionService.getAllSessions();
    }

    @GetMapping("/{id}")
    public SessionRequest getSession(@PathVariable Long id) {
        return sessionService.getSessionById(id);
    }

    @PostMapping
    public SessionRequest createSession(@RequestBody SessionRequest request) {
        return sessionService.createSession(request);
    }

    @PutMapping("/{id}/status")
    public SessionRequest updateSessionStatus(@PathVariable Long id, @RequestParam String status) {
        return sessionService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
    }
}