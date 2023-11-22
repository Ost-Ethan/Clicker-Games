/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg, { Client } from 'pg';
import { ClientError, authMiddleware, errorMiddleware } from './lib/index.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

type Auth = {
  username: string;
  inputPassword: string;
};

type User = {
  userId: number;
  username: string;
  password: string;
};

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Get all time entries from the times table with the given gameId. This will be used to generate the leaderboard when a game is finished.
app.get('/api/times/:gameId', async (req, res, next) => {
  try {
    const { gameId } = req.params;
    if (!gameId) {
      throw new ClientError(401, 'A valid gameId is required');
    }
    const sql = `
  select *
    from "times"
    join "users" using ("userId")
    where "gameId" = $1;
  `;
    const params = [gameId];
    const result = await db.query(sql, params);
    if (!result) {
      throw new ClientError(500, 'An unexpected error has occured.');
    }
    const scores = result.rows;
    res.json(scores);
  } catch (err) {
    next(err);
  }
});

// Post a new time to the list. This could be used for posting the first time for an user.
app.post('/api/times', authMiddleware, async (req, res, next) => {
  try {
    const { userId, gameId, bestTime } = req.body;
    if (!userId || !gameId || !bestTime) {
      throw new ClientError(
        401,
        'A userId, gameId, and bestTime are required.'
      );
    }
    const sql = `
  insert into "times" ("userId", "gameId", "bestTime")
    values ($1, $2, $3)
    returning * ;`;
    const params = [userId, gameId, bestTime];

    const result = await db.query(sql, params);
    const newTime = result.rows;
    res.json(newTime);
  } catch (err) {
    next(err);
  }
});

// updates a user's time entry if they have gotten a time that is better than their best time.
app.put('/api/times', authMiddleware, async (req, res, next) => {
  try {
    const { userId, gameId, bestTime } = req.body;
    const sql = `
  update "times"
    set
    "bestTime" = $3
    where "userId" = $1 and "gameId" = $2
    returning * ;`;
    const params = [userId, gameId, bestTime];

    const result = await db.query(sql, params);
    if (!result) {
      throw new ClientError(500, 'There was an issue updating your score.');
    }
    const newTime = result.rows;
    res.json(newTime);
  } catch (err) {
    next(err);
  }
});

// get all users from the users table, for testing purposes only.
app.get('/api/users', async (req, res, next) => {
  try {
    const sql = `
  select *
    from "users";
  `;
    const result = await db.query(sql);
    const scores = result.rows;
    res.json(scores);
  } catch (err) {
    next(err);
  }
});

// This endpoint calls all scores for the current user when displaying them on the profile page. Unfinshed currently.
app.get('/api/user/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      throw new ClientError(500, 'Username not found.');
    }
    const sql = `
  select *
    from "users";
  `;
    const result = await db.query(sql);
    const userScores = result.rows;
    res.json(userScores);
  } catch (err) {
    next(err);
  }
});

// Add a new user to the users table
app.post('/api/user/sign-up', async (req, res, next) => {
  try {
    const { username, inputPassword } = req.body as Partial<Auth>;
    if (!username || !inputPassword) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(inputPassword);

    const sql = `
  insert into "users" ("username", "password")
    values ($1, $2)
    returning * ;`;
    const params = [username, hashedPassword];

    const result = await db.query(sql, params);
    const newUser = result.rows;
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});
// user Sign in request
app.post('/api/users/sign-in', async (req, res, next) => {
  try {
    const { username, inputPassword } = req.body as Partial<Auth>;
    if (!username || !inputPassword) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
    select "userId",
           "password"
      from "users"
     where "username" = $1
  `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, password } = user;
    if (!(await argon2.verify(password, inputPassword))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Vite server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
