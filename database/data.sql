-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "users" ("username", "password")
values
    ('Admin2', '$argon2id$v=19$m=4096,t=3,p=1$2pmN99IiEUzA9yxzhUBhiA$OemaFRk2kDMzkAnrCBXJNM4z3ghIdWUTaUw0iytYm48');

insert into "games" ("gameName")
  values
      ('SpeedClicker');
insert into "games" ("gameName")
  values
      ('QuickDraw');

insert into "times" ("userId", "gameId", "bestTime")
  values
      (1, 1, 1334);
