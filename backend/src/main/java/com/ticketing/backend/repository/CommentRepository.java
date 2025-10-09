package com.ticketing.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ticketing.backend.model.Comment;

// Feature 4: Repository interface for Comment CRUD operations
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    // Feature 5: Derived query - find comments by ticket ID and sorted by creation date
    List<Comment> findByTicketIdOrderByCreatedAtAsc(Long ticketId);
}