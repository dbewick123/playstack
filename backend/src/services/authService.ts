import bcrypt from "bcrypt";
import pool from "../db/pool.js";
import { ConflictError } from "../erros/ConflictError.js";

const BCRYPT_COST = 12;

const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const errors: { field: string; message: string }[] = [];
  const usernameDuplicateError = "Username taken, please use another";
  const emailDuplicateError = "Account with this email already exists";

  try {
    const existing = await pool.query(
      `SELECT
        EXISTS(SELECT 1 FROM users WHERE LOWER(email) = LOWER($1)) as email_taken,
        EXISTS(SELECT 1 FROM users WHERE LOWER(username) = LOWER($2)) as username_taken`,
      [email, username],
    );

    const { email_taken, username_taken } = existing.rows[0];

    if (username_taken)
      errors.push({ field: "username", message: usernameDuplicateError });
    if (email_taken)
      errors.push({ field: "email", message: emailDuplicateError });

    if (errors?.length > 0) throw new ConflictError(errors);

    const passwordHash = await bcrypt.hash(password, BCRYPT_COST);

    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, username, email`,
      [username, email, passwordHash],
    );

    //left this in incase of race condition where two users signup at same time with same username
    return result.rows[0] as { id: string; username: string; email: string };
  } catch (err) {
    if (err instanceof ConflictError) throw err;
    throw new Error("Could not create account, please try again"); // fallback
  }
};

const verifyUser = async (email: string, password: string) => {
  const result = await pool.query(
    `SELECT id, username, email, password_hash FROM users WHERE LOWER(email) = LOWER($1)`,
    [email],
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  return { id: user.id, username: user.username, email: user.email } as {
    id: string;
    username: string;
    email: string;
  };
};

const getUserById = async (id: string) => {
  const result = await pool.query(
    `SELECT id, username, email FROM users WHERE id = $1`,
    [id],
  );
  return result.rows[0] as
    | { id: string; username: string; email: string }
    | undefined;
};

export { createUser, verifyUser, getUserById };
