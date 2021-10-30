CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
	  title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Alex Papadimoulis', 'https://thedailywtf.com/', 'The Daily WTF', 1000);
INSERT INTO blogs (author, url, title, likes) VALUES ('Jeff Atwood', 'https://blog.codinghorror.com/', 'Coding Horror', 500);