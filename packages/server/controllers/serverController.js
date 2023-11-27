import session from 'express-session';
import { default as RedisStore } from 'connect-redis';
import redisClient from '../redis.js';
import * as dotenv from 'dotenv';
dotenv.config();

const { COOKIE_SECRET, NODE_ENV } = process.env;

const sessionMiddleware = session({
  secret: COOKIE_SECRET,
  credentials: true,
  name: 'sid',
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: NODE_ENV === 'production' ? 'true' : 'auto',
    httpOnly: true,
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    expires: 1000 * 60 * 60 * 24 * 7,
  },
});

const wrap = (expressMiddleware) => (socket, next) => expressMiddleware(socket.request, {}, next);

const corsConfig = {
  origin: 'http://localhost:5173',
  credentials: true,
};

export { sessionMiddleware, wrap, corsConfig };
