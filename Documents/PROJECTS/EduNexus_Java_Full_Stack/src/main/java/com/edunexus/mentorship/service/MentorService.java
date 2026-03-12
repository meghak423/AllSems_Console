package com.edunexus.mentorship.service;

import com.edunexus.mentorship.model.Mentor;
import com.edunexus.mentorship.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MentorService {

    @Autowired
    private MentorRepository mentorRepository;

    public List<Mentor> getAllMentors() {
        return mentorRepository.findAll();
    }

    public Mentor getMentorById(Long id) {
        return mentorRepository.findById(id).orElse(null);
    }

    public Mentor createMentor(Mentor mentor) {
        return mentorRepository.save(mentor);
    }

    public void deleteMentor(Long id) {
        mentorRepository.deleteById(id);
    }
}
