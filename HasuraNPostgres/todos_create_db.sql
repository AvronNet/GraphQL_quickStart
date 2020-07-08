CREATE TABLE todos (
    id        		BIGSERIAL PRIMARY KEY,
    title       	varchar(150) not null,
    done			BOOL default false,
    created_date   	timestamp with time zone,
    completed_date  timestamp with time zone
);

CREATE TABLE notes (
    id        		BIGSERIAL PRIMARY KEY,
    todo_id       	bigint REFERENCES todos(id),
    note			varchar(4000) not null,
    created_date   	timestamp with time zone,
    updated_date	timestamp with time zone
);



INSERT INTO todos (title, created_date)
VALUES 
	('Learn GraphQL','2019-09-12'),
	('Check out Hasura','2019-09-12'),
	('Run docker compose','2019-09-12'),
	('Check out Apollo graphql client','2019-09-12'),
	('Write queries','2019-09-12'),
	('Write subscriptions','2019-09-12'),
	('Write mutations','2019-09-12');
	
INSERT INTO notes (todo_id, note, created_date)
	(SELECT id, 'Check URL https://graphql.org/', now() FROM todos WHERE title = 'Learn GraphQL');
INSERT INTO notes (todo_id, note, created_date)
	(SELECT id, 'Check URL https://hasura.io and the docs https://docs.hasura.io', now() FROM todos WHERE title = 'Check out Hasura');
INSERT INTO notes (todo_id, note, created_date)
	(SELECT id, 'docker-compose up -d', now() FROM todos WHERE title = 'Run docker compose');
INSERT INTO notes (todo_id, note, created_date)	
	(SELECT id, 'Check URL https://www.apollographql.com/ and the ReactJS docs https://www.apollographql.com/docs/react', now() FROM todos WHERE title = 'Check out Apollo graphql client');