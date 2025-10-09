package com.ticketing.backend.controller;

import com.ticketing.backend.dto.LoginRequest;
import com.ticketing.backend.dto.LoginResponse;
import com.ticketing.backend.exception.InvalidCredentialsException;
import com.ticketing.backend.model.User;
import com.ticketing.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Feature 1: REST API endpoint design for authentication
// Feature 2: RestController with proper annotations
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    // Feature 1: POST endpoint for user login with request body
    // Feature 2: PostMapping annotation for handling login requests
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        // Using native SQL query for authentication
        User user = userRepository.authenticateUser(
            loginRequest.getUsername(), 
            loginRequest.getPassword()
        ).orElseThrow(() -> new InvalidCredentialsException("Invalid username or password"));
        
        LoginResponse response = new LoginResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRole(),
            "Login successful"
        );
        
        return ResponseEntity.ok(response);
    }
    
    // Feature 1: POST endpoint for user registration
    // Feature 2: PostMapping for creating new user
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        user.setCreatedAt(java.time.LocalDateTime.now());
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}