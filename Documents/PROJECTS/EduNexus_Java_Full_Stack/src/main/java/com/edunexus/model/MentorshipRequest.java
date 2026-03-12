package com.edunexus.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mentorship_requests")
public class MentorshipRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;

    @ManyToOne
    @JoinColumn(name = "junior_id", nullable = false)
    private User junior;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private User mentor;

    @Column(name = "request_date", nullable = false, updatable = false)
    private LocalDateTime requestDate = LocalDateTime.now();

    public enum MentorshipStatus {
        PENDING,
        ACCEPTED,
        REJECTED,
        COMPLETED
    }

    @Enumerated(EnumType.STRING) // Store Enum as String in DB
    private MentorshipStatus status;

    private String topics;

    // Constructors
    public MentorshipRequest() {
    }

    public MentorshipRequest(User junior, User mentor, MentorshipStatus status, String topics) {
        this.junior = junior;
        this.mentor = mentor;
        this.status = status;
        this.topics = topics;
    }

    // Getters and Setters
    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public User getJunior() {
        return junior;
    }

    public void setJunior(User junior) {
        this.junior = junior;
    }

    public User getMentor() {
        return mentor;
    }

    public void setMentor(User mentor) {
        this.mentor = mentor;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public MentorshipStatus getStatus() {
        return status;
    }

    public void setStatus(MentorshipStatus status) {
        this.status = status;
    }

    public String getTopics() {
        return topics;
    }

    public void setTopics(String topics) {
        this.topics = topics;
    }
}