-- users: This table is the basic user data. Another userinfo table is used for storing other essential user data
CREATE TABLE IF NOT EXISTS users(
    id VARCHAR(255) PRIMARY KEY,
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

-- adduser: A stored procedure to insert into the user table. This will be exposed to the express app
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
    INSERT INTO users(id, username, password, email, type, first_name, last_name, bio, profile_picture)
    VALUES (UUID(), p_username, p_password, p_email, p_type, p_first_name, p_last_name, p_bio, p_profile_picture);
END//

DELIMITER ;

-- getuser: A stored procedure to get a single users row
DELIMITER //

CREATE PROCEDURE getuser(IN p_username VARCHAR(255))
BEGIN
    SELECT username, password, email, first_name, last_name, bio, profile_picture FROM users WHERE username = p_username;
END//

DELIMITER ;

-- getallusers: A stored procedure to get all users row
DELIMITER //

CREATE PROCEDURE getallusers()
BEGIN
    SELECT username, password, email, first_name, last_name, bio, profile_picture FROM users;
END//

DELIMITER ;

-- deleteuser: A stored procedure to delete a users row
DELIMITER //

CREATE PROCEDURE deleteuser(IN p_username VARCHAR(255))
BEGIN
    DELETE FROM users WHERE username = p_username;
END//

DELIMITER ;

-- updatepass: A stored procedure to update users.password
DELIMITER //

CREATE PROCEDURE updatepass(IN p_username VARCHAR(255), IN p_password VARCHAR(255))
BEGIN
    UPDATE users SET password = p_password WHERE username = p_username;
END//

DELIMITER ;

-- updatename: A stored procedure to update users.first_name and users.last_name
DELIMITER //

CREATE PROCEDURE updatename(IN p_username VARCHAR(255), IN p_first_name VARCHAR(255), IN p_last_name VARCHAR(255))
BEGIN
    UPDATE users SET first_name = p_first_name, last_name = p_last_name WHERE username = p_username;
END//

DELIMITER ;

-- updatebio: A stored procedure to update users.bio
DELIMITER //

CREATE PROCEDURE updatebio(IN p_username VARCHAR(255), IN p_bio VARCHAR(255))
BEGIN
    UPDATE users SET bio = p_bio WHERE username = p_username;
END//

DELIMITER ;

-- updateprofilepicture: A stored procedure to update users.profile_picture
DELIMITER //

CREATE PROCEDURE updateprofilepicture(IN p_username VARCHAR(255), IN p_profile_picture VARCHAR(255))
BEGIN
    UPDATE users SET profile_picture = p_profile_picture WHERE username = p_username;
END//

DELIMITER ;
