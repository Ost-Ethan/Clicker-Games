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
    ('Admin2', '$argon2id$v=19$m=4096,t=3,p=1$2pmN99IiEUzA9yxzhUBhiA$OemaFRk2kDMzkAnrCBXJNM4z3ghIdWUTaUw0iytYm48'),
    ('I', '$argon2id$v=19$m=4096,t=3,p=1$2pmN99IiEUzA9yxzhUBhiA$OemaFRk2kDMzkAnrCBXJNM4z3ghIdWUTaUw0iytYm48'),
    ('Am', '$argon2id$v=19$m=4096,t=3,p=1$2pmN99IiEUzA9yxzhUBhiA$OemaFRk2kDMzkAnrCBXJNM4z3ghIdWUTaUw0iytYm48'),
    ('Finished', '$argon2id$v=19$m=4096,t=3,p=1$2pmN99IiEUzA9yxzhUBhiA$OemaFRk2kDMzkAnrCBXJNM4z3ghIdWUTaUw0iytYm48'),
    ('Presenting!', '$argon2id$v=19$m=4096,t=3,p=1$2pmN99IiEUzA9yxzhUBhiA$OemaFRk2kDMzkAnrCBXJNM4z3ghIdWUTaUw0iytYm48');

insert into "games" ("gameName")
  values
      ('SpeedClicker');
insert into "games" ("gameName")
  values
      ('QuickDraw');

insert into "times" ("userId", "gameId", "bestTime")
  values
      (1, 1, 1334),
      (2, 2, 1),
      (3, 2, 2),
      (4, 2, 3),
      (5, 2, 4);
