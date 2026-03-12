package com.edunexus.controller;

import com.edunexus.model.MentorshipRequest;
import com.edunexus.service.MentorshipRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/mentorship/requests")
public class MentorshipController {

    @Autowired
    private MentorshipRequestService mentorshipRequestService;

    @GetMapping
    public ResponseEntity<List<MentorshipRequest>> getAllMentorshipRequests() {
        return new ResponseEntity<>(mentorshipRequestService.getAllMentorshipRequests(), HttpStatus.OK);
    }

    @GetMapping("/{requestId}")
    public ResponseEntity<MentorshipRequest> getMentorshipRequestById(@PathVariable Long requestId) {
        Optional<MentorshipRequest> mentorshipRequest = mentorshipRequestService.getMentorshipRequestById(requestId);
        return mentorshipRequest.map(response -> new ResponseEntity<>(response, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<MentorshipRequest> createMentorshipRequest(@RequestBody MentorshipRequest mentorshipRequest) {
        MentorshipRequest createdRequest = mentorshipRequestService.createMentorshipRequest(mentorshipRequest);
        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }

    @PutMapping("/{requestId}")
    public ResponseEntity<MentorshipRequest> updateMentorshipRequest(
            @PathVariable Long requestId,
            @RequestBody MentorshipRequest mentorshipRequest) {
        MentorshipRequest updatedRequest = mentorshipRequestService.updateMentorshipRequest(requestId, mentorshipRequest);
        if (updatedRequest != null) {
            return new ResponseEntity<>(updatedRequest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{requestId}")
    public ResponseEntity<Void> deleteMentorshipRequest(@PathVariable Long requestId) {
        mentorshipRequestService.deleteMentorshipRequest(requestId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<MentorshipRequest>> getMentorshipRequestsByStatus(
            @PathVariable MentorshipRequest.MentorshipStatus status) {
        List<MentorshipRequest> requests = mentorshipRequestService.getMentorshipRequestsByStatus(status);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @PutMapping("/{requestId}/status")
    public ResponseEntity<MentorshipRequest> updateMentorshipRequestStatus(
            @PathVariable Long requestId,
            @RequestBody Map<String, String> requestBody) {
        String newStatusString = requestBody.get("newStatus");
        if (newStatusString != null) {
            MentorshipRequest updatedRequest = mentorshipRequestService.updateMentorshipRequestStatus(requestId, newStatusString);
            if (updatedRequest != null) {
                return new ResponseEntity<>(updatedRequest, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}