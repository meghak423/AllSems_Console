package com.edunexus.mentorship.controller;

import com.edunexus.mentorship.model.Mentor;
import com.edunexus.mentorship.service.MentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentors")
public class MentorController {

    @Autowired
    private MentorService mentorService;

    @GetMapping
    public List<Mentor> getAllMentors() {
        return mentorService.getAllMentors();
    }

    @GetMapping("/{id}")
    public Mentor getMentor(@PathVariable Long id) {
        return mentorService.getMentorById(id);
    }

    @PostMapping
    public Mentor createMentor(@RequestBody Mentor mentor) {
        return mentorService.createMentor(mentor);
    }

    @DeleteMapping("/{id}")
    public void deleteMentor(@PathVariable Long id) {
        mentorService.deleteMentor(id);
    }
}