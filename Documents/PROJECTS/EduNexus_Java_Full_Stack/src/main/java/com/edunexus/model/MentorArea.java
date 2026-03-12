package com.edunexus.model;

import jakarta.persistence.*;

@Entity
@Table(name = "mentor_areas")
public class MentorArea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "area_id")
    private Long areaId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "expertise_area", nullable = false)
    private String expertiseArea;

    public MentorArea() {
    }

    public MentorArea(User user, String expertiseArea) {
        this.user = user;
        this.expertiseArea = expertiseArea;
    }

    // Getters and Setters
    public Long getAreaId() {
        return areaId;
    }

    public void setAreaId(Long areaId) {
        this.areaId = areaId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getExpertiseArea() {
        return expertiseArea;
    }

    public void setExpertiseArea(String expertiseArea) {
        this.expertiseArea = expertiseArea;
    }
}