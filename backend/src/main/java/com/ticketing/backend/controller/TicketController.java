package com.ticketing.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketing.backend.dto.CommentRequest;
import com.ticketing.backend.exception.ResourceNotFoundException;
import com.ticketing.backend.model.Comment;
import com.ticketing.backend.model.Ticket;
import com.ticketing.backend.repository.CommentRepository;
import com.ticketing.backend.repository.TicketRepository;
import com.ticketing.backend.repository.UserRepository;

// Feature 1: RESTful API endpoint design following best practices
// Feature 2: RestController with proper HTTP method annotations
@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {
    
    @Autowired
    private TicketRepository ticketRepository;
    
    @Autowired
    private CommentRepository commentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    // Feature 1: GET endpoint with query parameters for filtering/searching
    // Feature 2: GetMapping annotation, RequestParam for query parameters
    // Feature 4: Retrieve all tickets with optional filtering (READ operation)
    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Long reporterId) {
        
        List<Ticket> tickets;
        
        // Feature 5: Using complex JPQL query when filters provided
        if (status != null || priority != null || reporterId != null) {
            tickets = ticketRepository.searchTickets(status, priority, reporterId);
        } else {
            // Feature 4: Basic CRUD - find all
            tickets = ticketRepository.findAll();
        }
        
        return ResponseEntity.ok(tickets);
    }
    
    // Feature 1: GET endpoint with path variable for specific resource
    // Feature 2: PathVariable annotation to extract ticket ID from URL
    // Feature 4: Retrieve single ticket by ID (READ operation)
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        Ticket ticket = ticketRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
        return ResponseEntity.ok(ticket);
    }
    
    // Feature 1: POST endpoint for creating new resource
    // Feature 2: PostMapping with RequestBody annotation
    // Feature 4: Create new ticket (CREATE operation)
    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        ticket.setStatus("OPEN");
        ticket.setCreatedAt(java.time.LocalDateTime.now());
        ticket.setUpdatedAt(java.time.LocalDateTime.now());
        Ticket savedTicket = ticketRepository.save(ticket);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTicket);
    }
    
    // Feature 1: PUT endpoint for updating existing resource
    // Feature 2: PutMapping with PathVariable and RequestBody
    // Feature 4: Update existing ticket (UPDATE operation)
    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(
            @PathVariable Long id, 
            @RequestBody Ticket ticketDetails) {
        
        Ticket ticket = ticketRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
        
        ticket.setTitle(ticketDetails.getTitle());
        ticket.setDescription(ticketDetails.getDescription());
        ticket.setStatus(ticketDetails.getStatus());
        ticket.setPriority(ticketDetails.getPriority());
        ticket.setSeverity(ticketDetails.getSeverity());
        ticket.setAssigneeId(ticketDetails.getAssigneeId());
        ticket.setUpdatedAt(java.time.LocalDateTime.now());
        
        Ticket updatedTicket = ticketRepository.save(ticket);
        return ResponseEntity.ok(updatedTicket);
    }
    
    // Feature 1: DELETE endpoint for removing resource
    // Feature 2: DeleteMapping with PathVariable
    // Feature 4: Delete ticket (DELETE operation)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        Ticket ticket = ticketRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
        
        ticketRepository.delete(ticket);
        return ResponseEntity.noContent().build();
    }
    
    // Feature 1: GET endpoint with path variable for nested resource
    // Feature 5: Using derived query to find comments by ticket ID
    @GetMapping("/{ticketId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByTicket(@PathVariable Long ticketId) {
        // Verify ticket exists
        ticketRepository.findById(ticketId)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + ticketId));
        
        List<Comment> comments = commentRepository.findByTicketIdOrderByCreatedAtAsc(ticketId);
        return ResponseEntity.ok(comments);
    }
    
    // Feature 1: POST endpoint for nested resource creation
    // Feature 4: Create comment for ticket (CREATE operation)
    @PostMapping("/{ticketId}/comments")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long ticketId,
            @RequestBody CommentRequest commentRequest) {
        
        Ticket ticket = ticketRepository.findById(ticketId)
            .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + ticketId));
        
        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setAuthorId(commentRequest.getAuthorId());
        comment.setAuthorName(commentRequest.getAuthorName());
        comment.setTicket(ticket);
        comment.setCreatedAt(java.time.LocalDateTime.now());
        
        Comment savedComment = commentRepository.save(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }
}