package com.ticketing.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ticketing.backend.model.Ticket;

// Feature 4: Repository interface for CRUD operations with sorting
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
    // Feature 5: Derived query - find tickets by status
    List<Ticket> findByStatus(String status);
    
    // Feature 5: Derived query - find tickets by priority (sorted)
    List<Ticket> findByPriorityOrderByCreatedAtDesc(String priority);
    
    // Feature 5: Derived query - find tickets by reporter
    List<Ticket> findByReporterId(Long reporterId);
    
    // Feature 5: JPQL query - complex search with multiple conditions
    @Query("SELECT t FROM Ticket t WHERE " +
           "(:status IS NULL OR t.status = :status) AND " +
           "(:priority IS NULL OR t.priority = :priority) AND " +
           "(:reporterId IS NULL OR t.reporterId = :reporterId) " +
           "ORDER BY t.createdAt DESC")
    List<Ticket> searchTickets(@Param("status") String status,
                              @Param("priority") String priority,
                              @Param("reporterId") Long reporterId);
}