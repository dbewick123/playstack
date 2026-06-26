import { describe, test, expect, afterAll } from "@jest/globals";
import supertest from "supertest";
import app from "../../src/app.js";
import pool from "../../src/db/pool.js";

const TEST_USER = {
  username: "testuser_auth",
  email: "test_auth@playstack.com",
  password: "TestPassword123!",
};

describe("Auth Routes", () => {
  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE email IN ($1, $2)", [
      TEST_USER.email,
      "notanemail",
    ]);
    await pool.end();
  });

  describe("POST /auth/signup", () => {
    test("should create a new user and return 201 with user object (no password)", async () => {
      const response = await supertest(app).post("/auth/signup").send(TEST_USER);
      expect(response.status).toBe(201);
      expect(response.body.username).toBe(TEST_USER.username);
      expect(response.body.email).toBe(TEST_USER.email);
      expect(response.body.id).toBeDefined();
      expect(response.body.password_hash).toBeUndefined();
    });

    test("should return 409 for duplicate email", async () => {
      const response = await supertest(app).post("/auth/signup").send(TEST_USER);
      expect(response.status).toBe(409);
    });

    test("should return 409 for an email matching an existing one in different case", async () => {
      const response = await supertest(app)
        .post("/auth/signup")
        .send({
          username: "different_username_ci",
          email: TEST_USER.email.toUpperCase(),
          password: TEST_USER.password,
        });
      expect(response.status).toBe(409);
    });

    test("should return 409 for a username matching an existing one in different case", async () => {
      const response = await supertest(app)
        .post("/auth/signup")
        .send({
          username: TEST_USER.username.toUpperCase(),
          email: "different_email_ci@playstack.com",
          password: TEST_USER.password,
        });
      expect(response.status).toBe(409);
    });

    test("should return 400 for missing fields", async () => {
      const response = await supertest(app)
        .post("/auth/signup")
        .send({ email: "other@playstack.com" });
      expect(response.status).toBe(400);
    });

    // 1.2.3 — both username and email already taken -> 409 with two field errors
    test("should return 409 with two field errors when username and email are both taken", async () => {
      const response = await supertest(app).post("/auth/signup").send({
        username: TEST_USER.username,
        email: TEST_USER.email,
        password: TEST_USER.password,
      });
      expect(response.status).toBe(409);
      expect(response.body.error.fields).toHaveLength(2);
      const fields = response.body.error.fields.map(
        (f: { field: string }) => f.field,
      );
      expect(fields).toEqual(expect.arrayContaining(["username", "email"]));
    });

    // 1.2.5 — malformed email rejected. TEST-FIRST: the backend has no email
    // format validation yet, so this is RED until that is added.
    test("should return 400 with an invalid-email message for a malformed email", async () => {
      const response = await supertest(app).post("/auth/signup").send({
        username: "newuser_invalid_email",
        email: "notanemail",
        password: TEST_USER.password,
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Please enter a valid email address");
    });
  });

  describe("POST /auth/login", () => {
    test("should return 200 and user object with correct credentials", async () => {
      const response = await supertest(app)
        .post("/auth/login")
        .send({ email: TEST_USER.email, password: TEST_USER.password });
      expect(response.status).toBe(200);
      expect(response.body.email).toBe(TEST_USER.email);
      expect(response.body.password_hash).toBeUndefined();
    });

    test("should return 401 for wrong password", async () => {
      const response = await supertest(app)
        .post("/auth/login")
        .send({ email: TEST_USER.email, password: "wrongpassword" });
      expect(response.status).toBe(401);
    });

    test("should return 400 for missing fields", async () => {
      const response = await supertest(app)
        .post("/auth/login")
        .send({ email: TEST_USER.email });
      expect(response.status).toBe(400);
    });

    // 1.2.6 — unknown email: 401 with the SAME generic message as a wrong
    // password (must not leak which field was wrong)
    test("should return 401 with the same generic message for an unknown email", async () => {
      const unknownEmail = await supertest(app).post("/auth/login").send({
        email: "nobody_unknown@playstack.com",
        password: TEST_USER.password,
      });
      expect(unknownEmail.status).toBe(401);

      const wrongPassword = await supertest(app).post("/auth/login").send({
        email: TEST_USER.email,
        password: "wrongpassword",
      });
      expect(unknownEmail.body.message).toBe("Invalid credentials");
      expect(unknownEmail.body.message).toBe(wrongPassword.body.message);
    });
  });

  describe("GET /auth/me", () => {
    test("should return { user: null } with no session", async () => {
      const response = await supertest(app).get("/auth/me");
      expect(response.status).toBe(200);
      expect(response.body.user).toBeNull();
    });

    test("should return the user after login", async () => {
      const agent = supertest.agent(app);
      await agent
        .post("/auth/login")
        .send({ email: TEST_USER.email, password: TEST_USER.password });
      const response = await agent.get("/auth/me");
      expect(response.status).toBe(200);
      expect(response.body.user.email).toBe(TEST_USER.email);
      expect(response.body.user.password_hash).toBeUndefined();
    });
  });

  describe("POST /auth/logout", () => {
    test("should return 401 when not logged in", async () => {
      const response = await supertest(app).post("/auth/logout");
      expect(response.status).toBe(401);
    });

    test("should destroy session and return 200", async () => {
      const agent = supertest.agent(app);
      await agent
        .post("/auth/login")
        .send({ email: TEST_USER.email, password: TEST_USER.password });
      const logoutResponse = await agent.post("/auth/logout");
      expect(logoutResponse.status).toBe(200);
      const meResponse = await agent.get("/auth/me");
      expect(meResponse.body.user).toBeNull();
    });
  });

  describe("Session expiry", () => {
    test("should treat the user as logged out once their session has expired", async () => {
      const agent = supertest.agent(app);
      const loginResponse = await agent
        .post("/auth/login")
        .send({ email: TEST_USER.email, password: TEST_USER.password });
      const userId = loginResponse.body.id as string;

      // Sanity check: the session is valid immediately after login.
      const beforeExpiry = await agent.get("/auth/me");
      expect(beforeExpiry.body.user.id).toBe(userId);

      // Force the persisted session to expire by setting table column
      await pool.query(
        `UPDATE session SET expire = NOW() - interval '1 hour' WHERE sess->>'userId' = $1`,
        [userId],
      );

      const afterExpiry = await agent.get("/auth/me");
      expect(afterExpiry.status).toBe(200);
      expect(afterExpiry.body.user).toBeNull();

      await pool.query(`DELETE FROM session WHERE sess->>'userId' = $1`, [
        userId,
      ]);
    });
  });

  describe("X-Authenticated header", () => {
    // 3.3.2 — header is set on every response (here a public route), false out
    test("a logged-out request carries X-Authenticated: false", async () => {
      const response = await supertest(app).get("/");
      expect(response.headers["x-authenticated"]).toBe("false");
    });

    // 3.3.1 — true once a session exists
    test("a logged-in request carries X-Authenticated: true", async () => {
      const agent = supertest.agent(app);
      await agent
        .post("/auth/login")
        .send({ email: TEST_USER.email, password: TEST_USER.password });
      const response = await agent.get("/");
      expect(response.headers["x-authenticated"]).toBe("true");
    });
  });
});
