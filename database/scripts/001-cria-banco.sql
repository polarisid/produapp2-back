CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL
);

CREATE TABLE sessions (
   id SERIAL PRIMARY KEY,
   token TEXT NOT NULL UNIQUE,
   "userId" INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE item (
	id SERIAL PRIMARY KEY,
	os TEXT NOT NULL,
	model TEXT NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES users(id),
	"typeId" INTEGER NOT NULL REFERENCES type(id),
	datetime TIMESTAMP NOT NULL DEFAULT NOW()
	
);

CREATE TABLE type(
id SERIAL PRIMARY KEY,
name TEXT NOT NULL 
);