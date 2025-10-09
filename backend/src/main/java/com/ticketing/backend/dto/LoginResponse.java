package com.ticketing.backend.dto;

// Data Transfer Object for login response
public class LoginResponse {
    private Long userId;
    private String username;
    private String email;
    private String role;
    private String message;
    
    // Default constructor
    public LoginResponse() {
    }
    
    // Constructor with all fields
    public LoginResponse(Long userId, String username, String email, String role, String message) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.message = message;
    }
    
    // Getters and setters
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
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}
