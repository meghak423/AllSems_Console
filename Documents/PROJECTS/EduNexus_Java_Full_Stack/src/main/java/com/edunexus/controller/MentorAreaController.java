package com.edunexus.controller;

import com.edunexus.model.MentorArea;
import com.edunexus.service.MentorAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mentor_areas")
public class MentorAreaController {

    @Autowired
    private MentorAreaService mentorAreaService;

    @PostMapping
    public ResponseEntity<MentorArea> createMentorArea(@RequestBody MentorArea mentorArea) {
        MentorArea createdMentorArea = mentorAreaService.createMentorArea(mentorArea);
        return new ResponseEntity<>(createdMentorArea, HttpStatus.CREATED);
    }

    // You can add other endpoints here if needed (e.g., GET to retrieve mentor areas)
}