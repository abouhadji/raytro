DROP DATABASE IF EXISTS Feedback;
CREATE DATABASE Feedback CHARACTER SET utf8;
USE Feedback;

CREATE USER IF NOT EXISTS aboulabi@localhost IDENTIFIED BY 'feed';
GRANT ALL ON Feedback.* TO aboulabi@localhost;

CREATE TABLE IF NOT EXISTS User (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NULL,
    email VARCHAR(255) NULL UNIQUE,
    password VARCHAR(255) NULL,
    liked tinyint(1),
    unliked tinyint(1),
    admin tinyint(1)
);

CREATE TABLE IF NOT EXISTS Comments (
    CommentsID INT PRIMARY KEY AUTO_INCREMENT,
    message VARCHAR(255)NOT NULL,
    type tinyint(1),
    week INT NOT NULL 
);