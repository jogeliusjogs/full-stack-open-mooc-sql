CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
	  title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Alex Papadimoulis', 'https://thedailywtf.com/', 'The Daily WTF', 1000);
INSERT INTO blogs (author, url, title, likes) VALUES ('Jeff Atwood', 'https://blog.codinghorror.com/', 'Coding Horror', 500);

--Commands below used to add seed data to the database at later stages of the exercises

INSERT INTO users (username, name, created_at, updated_at) VALUES ('jokke@fakeemail.org', 'jogelius jogs', NOW(), NOW())
INSERT INTO users (username, name, created_at, updated_at) VALUES ('randomguy@fakeemail.org', 'random guy', NOW(), NOW())

INSERT INTO blogs (author, url, title, likes, year, user_id, created_at, updated_at) VALUES ('Alex Papadimoulis', 'https://thedailywtf.com/', 'The Daily WTF', 1000, 2004, 1, NOW(), NOW());
INSERT INTO blogs (author, url, title, likes, year, user_id, created_at, updated_at) VALUES ('Jeff Atwood', 'https://blog.codinghorror.com/', 'Coding Horror', 500, 2004, 2, NOW(), NOW());