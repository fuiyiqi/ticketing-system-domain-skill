-- Insert users
INSERT INTO app_user (username, password, email, role, created_at) VALUES
('qa_user', 'password123', 'qa@example.com', 'QA', CURRENT_TIMESTAMP()),
('dev_user', 'password123', 'dev@example.com', 'Developer', CURRENT_TIMESTAMP()),
('admin', 'admin123', 'admin@example.com', 'Admin', CURRENT_TIMESTAMP());

-- Insert tickets
INSERT INTO tickets (title, description, status, priority, severity, reporter_id, assignee_id, created_at, updated_at) VALUES
('Login page not responsive on mobile', 'The login form elements overlap on small screens.', 'OPEN', 'HIGH', 'MAJOR', 1, 2, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Dashboard charts not loading properly', 'The sales data visualization is not rendering correctly in Firefox.', 'IN_PROGRESS', 'MEDIUM', 'MINOR', 1, 2, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Authentication token expires too quickly', 'Users are being logged out after only 5 minutes of inactivity.', 'OPEN', 'CRITICAL', 'BLOCKER', 2, NULL, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Missing validation on registration form', 'Email format is not being validated before submission.', 'RESOLVED', 'LOW', 'MINOR', 2, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

-- Insert comments
INSERT INTO comments (content, author_id, author_name, ticket_id, created_at) VALUES
('I can reproduce this issue on iPhone 12.', 2, 'dev_user', 1, CURRENT_TIMESTAMP()),
('Also seeing this on Android devices.', 1, 'qa_user', 1, CURRENT_TIMESTAMP()),
('Working on a fix for this now.', 2, 'dev_user', 2, CURRENT_TIMESTAMP());