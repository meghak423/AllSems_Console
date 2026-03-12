package com.edunexus.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "full_name")
    private String fullName;

    private String major;
    private String yearOfStudy;
    private String contactInfo;

    @Column(name = "registration_date", nullable = false, updatable = false)
    private LocalDateTime registrationDate = LocalDateTime.now();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MentorArea> mentorAreas = new ArrayList<>();

    @OneToMany(mappedBy = "junior", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MentorshipRequest> mentorshipRequestsAsJunior = new ArrayList<>();

    @OneToMany(mappedBy = "mentor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MentorshipRequest> mentorshipRequestsAsMentor = new ArrayList<>();

    public User() {
    }

    public User(String username, String password, String email, String fullName, String major, String yearOfStudy, String contactInfo) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.major = major;
        this.yearOfStudy = yearOfStudy;
        this.contactInfo = contactInfo;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(String yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    public List<MentorArea> getMentorAreas() {
        return mentorAreas;
    }

    public void setMentorAreas(List<MentorArea> mentorAreas) {
        this.mentorAreas = mentorAreas;
    }

    public List<MentorshipRequest> getMentorshipRequestsAsJunior() {
        return mentorshipRequestsAsJunior;
    }

    public void setMentorshipRequestsAsJunior(List<MentorshipRequest> mentorshipRequestsAsJunior) {
        this.mentorshipRequestsAsJunior = mentorshipRequestsAsJunior;
    }

    public List<MentorshipRequest> getMentorshipRequestsAsMentor() {
        return mentorshipRequestsAsMentor;
    }

    public void setMentorshipRequestsAsMentor(List<MentorshipRequest> mentorshipRequestsAsMentor) {
        this.mentorshipRequestsAsMentor = mentorshipRequestsAsMentor;
    }
}