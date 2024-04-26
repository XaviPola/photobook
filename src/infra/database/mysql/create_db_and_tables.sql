CREATE DATABASE IF NOT EXISTS photobookdb;

USE photobookdb;

DROP TABLE IF EXISTS AlbumPictures;
DROP TABLE IF EXISTS AlbumCovers;
DROP TABLE IF EXISTS UserAlbums;
DROP TABLE IF EXISTS Albums;
DROP TABLE IF EXISTS Pictures;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT, 
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Pictures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    img_path VARCHAR(255) NOT NULL
);

CREATE TABLE AlbumPictures (
    album_id INT,
    picture_id INT,
    order_in_album INT NOT NULL,
    title VARCHAR(255),
    description TEXT,
    FOREIGN KEY (album_id) REFERENCES Albums(id),
    FOREIGN KEY (picture_id) REFERENCES Pictures(id),
    PRIMARY KEY (album_id, picture_id)
);

CREATE TABLE AlbumCovers (
    album_id INT,
    picture_id INT,
    background_color VARCHAR(50) NOT NULL,
    FOREIGN KEY (album_id) REFERENCES Albums(id),
    FOREIGN KEY (picture_id) REFERENCES Pictures(id),
    PRIMARY KEY (album_id)
);

CREATE TABLE About (
	album_id INT NOT NULL,
	about_author TEXT,
	author_picture_id INT,
	FOREIGN KEY (album_id) REFERENCES Albums(id),
	FOREIGN KEY (author_picture_id) REFERENCES Pictures(id),
	PRIMARY KEY (album_id)
);