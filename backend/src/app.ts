import dotenv from "dotenv";
dotenv.config();

import express, { Router } from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/pool.js";
import errorHandler from "./middleware/errorHandler.js";
import thirdPartyAuthentication from "./middleware/thirdPartyAuthentication.js";
import {
  gameCountController,
  gamesGetGameController,
  gamesSearchController,
  gamesNextPageController,
} from "./controllers/gameController.js";
import authRouter from "./routes/authRoutes.js";

const PgSession = connectPgSimple(session);

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL_FOR_CORS!],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(
  session({
    store: new PgSession({ pool }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

// Only using for testing
app.get("/error", (req, res) => {
  throw new Error("This is a test error");
});

app.get("/errorblank", (req, res) => {
  throw new Error();
});

// Auth routes
app.use("/auth", authRouter);

// Game routes — thirdPartyAuthentication scoped here only
const gamesRouter = Router();
gamesRouter.get("/count", gameCountController);
gamesRouter.get("/query/", gamesSearchController);
gamesRouter.get("/proxy/", gamesNextPageController);
gamesRouter.get("/:id", gamesGetGameController);
app.use("/games", thirdPartyAuthentication, gamesRouter);

// Health check
app.get("/", (req, res) => {
  res.send("Node Server is up and running!");
});

//Error handler should be the last middleware & after routes
app.use(errorHandler);

export default app;
