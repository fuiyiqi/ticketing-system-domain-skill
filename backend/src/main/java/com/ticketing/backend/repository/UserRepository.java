package com.ticketing.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ticketing.backend.model.User;

// Feature 4: Repository interface for CRUD operations on User entity
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Feature 5: Derived query - finds user by username
    Optional<User> findByUsername(String username);
    
    // Feature 5: Derived query - finds users by role
    List<User> findByRole(String role);
    
    // Feature 5: Native SQL query - custom authentication query
    @Query(value = "SELECT * FROM app_user WHERE username = :username AND password = :password", 
           nativeQuery = true)
    Optional<User> authenticateUser(@Param("username") String username, 
                                   @Param("password") String password);
}