const express = require('express');
const { Server } = require('socket.io');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const session = require('express-session');
const server = require('http').createServer(app);
const RedisStore = require('connect-redis').default;
const redisClient = require('./redis');
require('dotenv').config();

const { COOKIE_SECRET, ENVIROMENT } = process.env;

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: 'true',
    },
});

app.use(helmet());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);
app.use(express.json());
app.use(
    session({
        secret: COOKIE_SECRET,
        credentials: true,
        name: 'sid',
        store: new RedisStore({ client: redisClient }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: ENVIROMENT === 'production' ? 'true' : 'auto',
            httpOnly: true,
            sameSite: ENVIROMENT === 'production' ? 'none' : 'lax',
            expires: 1000 * 60 * 60 * 24 * 7,
        },
    })
);

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.json('hi');
});

io.on('connect', (socket) => {});

server.listen(4000, () => {
    console.log('Server listening on port 4000');
});
