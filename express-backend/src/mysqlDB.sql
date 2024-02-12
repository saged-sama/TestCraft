-- users: This table is the basic user data. Another userinfo table is used for storing other essential user data
CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    type ENUM('tutor', 'student') NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    bio TEXT,
    profile_picture VARCHAR(255),
    KEY (type)
);

-- adduser: A stored procedure to insert into the user table. This will be exposed into the express app
DELIMITER //

CREATE PROCEDURE adduser(
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_type ENUM('tutor', 'student'),
    IN p_first_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_bio TEXT,
    IN p_profile_picture VARCHAR(255)
)
BEGIN
    INSERT INTO users(username, password, email, type, first_name, last_name, bio, profile_picture)
    VALUES (p_username, p_password, p_email, p_type, p_first_name, p_last_name, p_bio, p_profile_picture);
END//

DELIMITER ;

-- getuser: A stored procedure to get a single user info
DELIMITER //

CREATE PROCEDURE getuser(
    IN p_username VARCHAR(255)
)
BEGIN
    SELECT username, password, email, first_name, last_name, bio, profile_picture FROM users WHERE username = p_username;
END//

DELIMITER ;

-- getallusers: A stored procedure to get a single user info
DELIMITER //

CREATE PROCEDURE getallusers()
BEGIN
    SELECT username, password, email, first_name, last_name, bio, profile_picture FROM users;
END//

DELIMITER ;