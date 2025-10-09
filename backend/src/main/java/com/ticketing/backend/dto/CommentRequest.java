package com.ticketing.backend.dto;

import lombok.Data;

@Data
public class CommentRequest {
    private String content;
    private Long authorId;
    private String authorName;
}