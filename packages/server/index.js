import express from 'express';
import { Server } from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import { createServer } from 'http';
import authRouter from './routes/authRouter.js';
import * as dotenv from 'dotenv';
import { corsConfig, sessionMiddleware, wrap } from './controllers/serverController.js';
import authorizeUser from './controllers/socketController.js';
dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use('/auth', authRouter);

io.use(wrap(sessionMiddleware));
io.use(authorizeUser);
io.on('connect', (socket) => {
  console.log(socket.id);
  console.log(socket.request.session.user.username);
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
