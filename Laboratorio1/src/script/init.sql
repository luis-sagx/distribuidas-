CREATE TABLE IF NOT EXISTS author (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(31) NOT NULL,
    lastName VARCHAR(31) NOT NULL,
    birthDate DATE,
    nationality VARCHAR(31),
    email VARCHAR(127) UNIQUE,
    INDEX idx_author_name (firstName, lastName)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- STORED PROCEDURES FOR AUTHOR CRUD OPERATIONS
-- ============================================

-- Get all authors
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_get_all_authors()
BEGIN
    SELECT id, firstName, lastName, birthDate, nationality, email FROM author;
END //
DELIMITER ;

-- Search authors by firstName or lastName
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_search_authors_by_names(
    IN p_search VARCHAR(100)
)
BEGIN
    DECLARE v_pattern VARCHAR(102);
    SET v_pattern = CONCAT('%', p_search, '%');
    
    SELECT id, firstName, lastName, birthDate, nationality, email 
    FROM author 
    WHERE firstName LIKE v_pattern 
       OR lastName LIKE v_pattern;
END //
DELIMITER ;

-- Create a new author
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_create_author(
    IN p_firstName VARCHAR(31),
    IN p_lastName VARCHAR(31),
    IN p_birthDate DATE,
    IN p_nationality VARCHAR(31),
    IN p_email VARCHAR(127)
)
BEGIN
    INSERT INTO author (firstName, lastName, birthDate, nationality, email)
    VALUES (p_firstName, p_lastName, p_birthDate, p_nationality, p_email);
    
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Update an author
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_update_author(
    IN p_id INT,
    IN p_firstName VARCHAR(31),
    IN p_lastName VARCHAR(31),
    IN p_birthDate DATE,
    IN p_nationality VARCHAR(31),
    IN p_email VARCHAR(127)
)
BEGIN
    UPDATE author 
    SET firstName = p_firstName, 
        lastName = p_lastName, 
        birthDate = p_birthDate, 
        nationality = p_nationality, 
        email = p_email
    WHERE id = p_id;
    
    SELECT ROW_COUNT() as affectedRows;
END //
DELIMITER ;

-- Delete an author
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_delete_author(
    IN p_id INT
)
BEGIN
    DELETE FROM author WHERE id = p_id;
    
    SELECT ROW_COUNT() as affectedRows;
END //
DELIMITER ;


CREATE TABLE IF NOT EXISTS book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    authorId INT NOT NULL,
    publicationYear YEAR,
    edition VARCHAR(30),
    language VARCHAR(30),
    INDEX idx_book_author (authorId),
    FOREIGN KEY (authorId) REFERENCES author(id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- STORED PROCEDURES FOR BOOK CRUD OPERATIONS
-- ============================================

-- Get all books
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_get_all_books()
BEGIN
    SELECT * FROM book;
END //
DELIMITER ;

-- Create a new book
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_create_book(
    IN p_title VARCHAR(100),
    IN p_isbn VARCHAR(20),
    IN p_publicationYear YEAR,
    IN p_edition VARCHAR(30),
    IN p_language VARCHAR(30),
    IN p_authorId INT
)
BEGIN
    INSERT INTO book (title, isbn, publicationYear, edition, language, authorId)
    VALUES (p_title, p_isbn, p_publicationYear, p_edition, p_language, p_authorId);
    
    SELECT LAST_INSERT_ID() as id;
END //
DELIMITER ;

-- Update a book
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_update_book(
    IN p_id INT,
    IN p_title VARCHAR(100),
    IN p_isbn VARCHAR(20),
    IN p_publicationYear YEAR,
    IN p_edition VARCHAR(30),
    IN p_language VARCHAR(30),
    IN p_authorId INT
)
BEGIN
    DECLARE v_affectedRows INT;
    
    UPDATE book 
    SET title = p_title, 
        isbn = p_isbn, 
        publicationYear = p_publicationYear, 
        edition = p_edition, 
        language = p_language, 
        authorId = p_authorId
    WHERE id = p_id;
    
    SELECT ROW_COUNT() as affectedRows;
END //
DELIMITER ;

-- Delete a book
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_delete_book(
    IN p_id INT
)
BEGIN
    DELETE FROM book WHERE id = p_id;
    
    SELECT ROW_COUNT() as affectedRows;
END //
DELIMITER ;

-- ============================================
-- GRANT PERMISSIONS
-- ============================================
GRANT ALL PRIVILEGES ON biblioteca-distribuida.* TO 'app_user'@'%';
FLUSH PRIVILEGES;