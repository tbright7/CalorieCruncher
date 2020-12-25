DROP DATABASE IF EXISTS mvp;

CREATE DATABASE mvp;
\c mvp

DROP TABLE IF EXISTS weights
DROP TABLE IF EXISTS users

CREATE TABLE users (
id serial,
username varchar,
age int,
weight int,
goal_weight int,
height int,
gender varchar, 
activity_level varchar, 
UNIQUE(username),
PRIMARY KEY(id)
);

CREATE TABLE weights (
id serial unique,
username varchar,
CONSTRAINT users
      FOREIGN KEY(username) 
	  REFERENCES users(username),
weight int,
date date,
UNIQUE(id),
PRIMARY KEY(username, id)
);
