DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
    todo_id serial PRIMARY KEY,
    task VARCHAR(50) NOT NULL,
    isCompleted BOOLEAN DEFAULT false
);

INSERT INTO todos (task, isCompleted)
VALUES 
    ( 'write this todo', true ),
    ( 'write another todo', true ),
    ( 'finish this project', false );