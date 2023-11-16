set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" text UNIQUE,
  "password" text,
  "createdAt" timestamptz
);

CREATE TABLE "times" (
  "timeId" serial PRIMARY KEY,
  "userId" integer,
  "gameId" integer,
  "bestTime" integer
);

CREATE TABLE "games" (
  "gameId" serial PRIMARY KEY,
  "gameName" text
);

ALTER TABLE "times" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "times" ADD FOREIGN KEY ("gameId") REFERENCES "games" ("gameId");
