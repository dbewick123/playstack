import dotenv from "dotenv";
dotenv.config();

import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

// Hosted Postgres (CI + prod) requires SSL; a local Postgres does not.
const isLocalDb =
  !connectionString ||
  connectionString.includes("localhost") ||
  connectionString.includes("127.0.0.1");

const pool = new Pool({
  connectionString,
  ssl: isLocalDb ? false : { rejectUnauthorized: false },
});

export default pool;
