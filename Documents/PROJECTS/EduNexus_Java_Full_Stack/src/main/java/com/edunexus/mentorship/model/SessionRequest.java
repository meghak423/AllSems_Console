package com.edunexus.mentorship.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class SessionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long mentorId;
    private String studentName;
    private String studentEmail;
    private String topic;
    private LocalDateTime sessionDateTime;
    private String status;

    public SessionRequest() {}

    public SessionRequest(Long id, Long mentorId, String studentName, String studentEmail, String topic, LocalDateTime sessionDateTime, String status) {
        this.id = id;
        this.mentorId = mentorId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.topic = topic;
        this.sessionDateTime = sessionDateTime;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public LocalDateTime getSessionDateTime() {
        return sessionDateTime;
    }

    public void setSessionDateTime(LocalDateTime sessionDateTime) {
        this.sessionDateTime = sessionDateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}