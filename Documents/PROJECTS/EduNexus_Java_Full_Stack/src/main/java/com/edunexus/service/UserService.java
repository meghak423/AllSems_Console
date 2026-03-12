package com.edunexus.service;

import com.edunexus.model.User;
import com.edunexus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        // You'd typically hash the password here before saving
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public User updateUser(Long userId, User user) {
        Optional<User> existingUserOptional = userRepository.findById(userId);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            // Update fields as needed
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setFullName(user.getFullName());
            existingUser.setMajor(user.getMajor());
            existingUser.setYearOfStudy(user.getYearOfStudy());
            existingUser.setContactInfo(user.getContactInfo());
            return userRepository.save(existingUser);
        }
        return null; // Or throw an exception
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public List<User> getAllMentors() {
        return userRepository.findMentors();
    }

    public User authenticateUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // You'd typically use a proper password hashing algorithm here
            if (user.getPassword().equals(password)) {
                return user;
            }
        }
        return null; // Authentication failed
    }
}