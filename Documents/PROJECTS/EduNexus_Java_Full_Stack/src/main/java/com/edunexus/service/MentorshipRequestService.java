package com.edunexus.service;

import com.edunexus.model.MentorshipRequest;
import com.edunexus.repository.MentorshipRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MentorshipRequestService {

    @Autowired
    private MentorshipRequestRepository mentorshipRequestRepository;

    public List<MentorshipRequest> getAllMentorshipRequests() {
        return mentorshipRequestRepository.findAll();
    }

    public Optional<MentorshipRequest> getMentorshipRequestById(Long requestId) {
        return mentorshipRequestRepository.findById(requestId);
    }

    public MentorshipRequest createMentorshipRequest(MentorshipRequest mentorshipRequest) {
        return mentorshipRequestRepository.save(mentorshipRequest);
    }

    public MentorshipRequest updateMentorshipRequest(
            Long requestId,
            MentorshipRequest mentorshipRequest) {
        Optional<MentorshipRequest> existingRequestOptional = mentorshipRequestRepository.findById(requestId);
        if (existingRequestOptional.isPresent()) {
            MentorshipRequest existingRequest = existingRequestOptional.get();
            // Update fields as needed
            existingRequest.setJunior(mentorshipRequest.getJunior());
            existingRequest.setMentor(mentorshipRequest.getMentor());
            existingRequest.setStatus(mentorshipRequest.getStatus());
            existingRequest.setTopics(mentorshipRequest.getTopics());
            return mentorshipRequestRepository.save(existingRequest);
        }
        return null; // Or throw an exception
    }

    public void deleteMentorshipRequest(Long requestId) {
        mentorshipRequestRepository.deleteById(requestId);
    }

    public List<MentorshipRequest> getMentorshipRequestsByStatus(
            MentorshipRequest.MentorshipStatus status) {
        return mentorshipRequestRepository.findByStatus(status);
    }

    public MentorshipRequest updateMentorshipRequestStatus(
            Long requestId,
            String newStatus) {  // *** CRITICAL: This MUST be String ***
        Optional<MentorshipRequest> existingRequestOptional = mentorshipRequestRepository.findById(requestId);
        if (existingRequestOptional.isPresent()) {
            MentorshipRequest existingRequest = existingRequestOptional.get();
            try {
                MentorshipRequest.MentorshipStatus parsedStatus = MentorshipRequest.MentorshipStatus.valueOf(newStatus.toUpperCase());
                existingRequest.setStatus(parsedStatus);
                return mentorshipRequestRepository.save(existingRequest);
            } catch (IllegalArgumentException e) {
                System.err.println("Invalid MentorshipStatus: " + newStatus);
                return null;  // Or throw an exception
            }
        }
        return null;  // Or throw an exception
    }
}