import pkg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const { DATABASE_NAME, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER, DATABASE_PORT } =
  process.env;

const pool = new Pool({
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  user: DATABASE_USER,
  port: DATABASE_PORT,
});

export default pool;
