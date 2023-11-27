import pool from '../db.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const handleLogin = async (req, res) => {
  const { user } = req.session;
  if (user && user.username) {
    console.log('logged in');
    res.json({ loggedIn: true, username: user.username });
  } else {
    res.json({ loggedIn: false });
  }
};

const attempLogin = async (req, res) => {
  const { username, password } = req.body;

  const potentialLogin = await pool.query(
    'SELECT id, username, passhash, userid FROM users u WHERE u.username=$1',
    [username]
  );

  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(password, potentialLogin.rows[0].passhash);

    if (isSamePass) {
      req.session.user = {
        username,
        id: potentialLogin.rows[0].id,
        userid: potentialLogin.rows[0].userid,
      };
      res.json({ loggedIn: true, username });
    } else {
      console.log('not good');
      res.json({
        loggedIn: false,
        status: 'Wrong username or password',
      });
    }
  } else {
    console.log('not good');
    res.json({ loggedIn: false, status: 'Wrong username or password' });
  }
};

const attempRegister = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await pool.query('SELECT username from users WHERE username=$1', [username]);

  if (existingUser.rowCount === 0) {
    // register
    const hashedPass = await bcrypt.hash(password, 10);
    const newUserQuery = await pool.query(
      'INSERT INTO users(username, passhash, userid) values ($1,$2,$3) RETURNING id, username, userid',
      [username, hashedPass, uuidv4()]
    );

    req.session.user = {
      username,
      id: newUserQuery.rows[0].id,
      userid: newUserQuery.rows[0].userid,
    };
    res.json({ loggedIn: true, username });
  } else {
    res.json({ loggedIn: false, status: 'Username taken' });
  }
};

export { handleLogin, attempLogin, attempRegister };
