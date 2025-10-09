# Issue Reporting System

A full-stack application for managing and tracking bug tickets/issues with Angular 19 frontend and Spring Boot backend.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Authentication](#authentication)


## Overview

This Issue Reporting System is a issue reporting ticketing application designed to ease the process of tracking bugs and issues. It features a modern Angular 19 frontend with a clean, responsive UI and a robust Spring Boot backend with RESTful API endpoints. The system allows for creating, tracking, updating, and resolving tickets with detailed information and comments.

## Features

- **User Authentication** - Secure login system with role-based access
- **Dashboard** - Overview of all tickets with filtering options
- **Ticket Management**
  - Create new tickets with title, description, priority, and severity
  - View ticket details with comments and history
  - Update ticket status, priority, and assignee
  - Delete tickets
- **Comment System** - Add comments to tickets for communication
- **Responsive UI** - Works seamlessly on desktop and mobile devices
- **Real-time Updates** - Visual indicators for status and priority
- **User Management** - Different roles (QA, Developer) with appropriate permissions

## Tech Stack

### Frontend
- **Framework**: Angular 19 (Standalone Components)
- **State Management**: Angular services with RxJS
- **UI Components**: Custom built with CSS
- **HTTP Client**: Angular HttpClient for API communication
- **Routing**: Angular Router for navigation
- **Form Handling**: Template-driven forms with validation

### Backend
- **Framework**: Spring Boot 
- **Database**: MySQL
- **API**: RESTful with JSON responses
- **Security**: Spring Security
- **ORM**: Spring Data JPA/Hibernate
- **Build Tool**: Maven

## Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── comment-section/
│   │   │   ├── create-ticket/
│   │   │   ├── dashboard/
│   │   │   ├── login/
│   │   │   ├── ticket-card/
│   │   │   ├── ticket-detail/
│   │   │   └── ticket-list/
│   │   ├── models/
│   │   │   ├── comment.ts
│   │   │   ├── ticket.ts
│   │   │   └── user.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── ticket.service.ts
│   │   │   └── error-handling.service.ts
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
```

### Backend Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── ticketing/
│   │   │           └── backend/
│   │   │               ├── controller/
│   │   │               │   ├── AuthController.java
│   │   │               │   ├── TicketController.java
│   │   │               │   └── UserController.java
│   │   │               ├── dto/
│   │   │               ├── exception/
│   │   │               ├── model/
│   │   │               │   ├── Comment.java
│   │   │               │   ├── Ticket.java
│   │   │               │   └── User.java
│   │   │               ├── repository/
│   │   │               └── BackendApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── test/
└── pom.xml
```
---------------------------------------------------
## Getting Started

### Prerequisites

- Java 21 or higher
- Node.js 18 or higher
- npm 9 or higher
- MySQL 8.0 or higher
- Maven 3.8 or higher


### Backend Setup

1. **Clone the repository**
   git clone <repository-url>
   cd microproject/backend
   

2. **Configure MySQL**
   - Create a MySQL database named `ticketing_db`
   - Update `application.properties` with your MySQL credentials if needed

3. **Build and run the backend**
   # Windows
   mvnw.cmd spring-boot:run
   
   # Linux/Mac
   ./mvnw spring-boot:run
   
   The backend will start on `http://localhost:8081`


### Frontend Setup

1. **Navigate to the frontend directory**
   cd ../frontend

2. **Install dependencies**
   npm install

3. **Run the development server**
   npm start

   The frontend will start on `http://localhost:4200`


## API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - Authenticate user and get JWT token

### Ticket Endpoints
- `GET /api/tickets` - Get all tickets (supports filtering by status, priority, reporterId)
- `GET /api/tickets/{id}` - Get specific ticket by ID
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/{id}` - Update existing ticket
- `DELETE /api/tickets/{id}` - Delete ticket

### Comment Endpoints
- `GET /api/tickets/{id}/comments` - Get all comments for a ticket
- `POST /api/tickets/{id}/comments` - Add comment to a ticket

### User Endpoints
- `GET /api/users` - Get all users

## Database

The application uses MySQL for data persistence with the following schema:

- **app_user** - Stores user information
  - id (PK)
  - username (unique)
  - password
  - email
  - role
  - created_at

- **tickets** - Stores ticket information
  - id (PK)
  - title
  - description
  - status
  - priority
  - severity
  - reporter_id (FK to app_user)
  - assignee_id (FK to app_user)
  - created_at
  - updated_at

- **comments** - Stores ticket comments
  - id (PK)
  - content
  - ticket_id (FK to tickets)
  - author_id (FK to app_user)
  - author_name
  - created_at

## Authentication

The system uses username/password authentication with JWT tokens:

1. Client sends credentials to `/api/auth/login`
2. Server validates credentials and returns JWT token
3. Client includes token in Authorization header for subsequent requests
4. Server validates token for each protected endpoint





