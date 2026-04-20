CREATE TABLE IF NOT EXISTS author (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(31) NOT NULL,
    lastName VARCHAR(31) NOT NULL,
    birthDate DATE,
    nationality VARCHAR(31),
    email VARCHAR(127) UNIQUE,
    INDEX idx_author_name (firstName, lastName)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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