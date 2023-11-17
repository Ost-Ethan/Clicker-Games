/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, authMiddleware, errorMiddleware } from './lib/index.js';
import { time } from 'node:console';
import { nextTick } from 'node:process';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

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
    const sql = `
  select *
    from "times"
    where "gameId" = $1
  join "users" using ("userId");
  `;
    const params = [gameId];
    const result = await db.query(sql, params);
    const scores = result.rows;
    res.json(scores);
  } catch (err) {
    next(err);
  }
});

// Post a new time to the list. This is for posting the first time for an account.
app.post('/api/times', async (req, res, next) => {
  try {
    const { userId, gameId, bestTime } = req.body;
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
app.put('/api/times', async (req, res, next) => {
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
    const newTime = result.rows;
    res.json(newTime);
  } catch (err) {
    next(err);
  }
});

// get all users from the users table, for testing purposes
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

// Add a new user to the users table
app.post('/api/users', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const sql = `
  insert into "users" ("username", "password")
    values ($1, $2)
    returning * ;`;
    const params = [username, password];

    const result = await db.query(sql, params);
    const newUser = result.rows;
    res.json(newUser);
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
