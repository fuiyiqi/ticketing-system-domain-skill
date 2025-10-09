package com.ticketing.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketing.backend.model.User;
import com.ticketing.backend.repository.UserRepository;

// Feature 1: API endpoints for user management
// Feature 2: RestController implementation
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    // Feature 1: GET endpoint with query parameter to filter users by role
    // Feature 5: Using derived query findByRole
    @GetMapping
    public ResponseEntity<List<User>> getUsersByRole(
            @RequestParam(required = false) String role) {

        List<User> users;
        if (role != null && !role.isEmpty()) {
            users = userRepository.findByRole(role);
        } else {
            users = userRepository.findAll();
        }
        return ResponseEntity.ok(users);
    }
}