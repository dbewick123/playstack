import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import thirdPartyAuthentication from "./middleware/thirdPartyAuthentication.js";
import {
  gameCountController,
  gamesGetGameController,
  gamesSearchController,
  gamesNextPageController,
} from "./controllers/gameController.js";

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL_FOR_CORS!],
  })
);

// Middleware
app.use(express.json());
app.use(thirdPartyAuthentication);

// Only using for testing
app.get("/error", (req, res) => {
  throw new Error("This is a test error");
});

app.get("/errorblank", (req, res) => {
  throw new Error();
});

// Main routes
app.get("/", (req, res) => {
  res.send("Node Server is up and running!");
});

app.get("/games/count", gameCountController);

// TODO: Document API for all below routes, especially the query parameters available (as they cant be seen in the code)
app.get("/games/query/", gamesSearchController);

app.get("/games/proxy/", gamesNextPageController);

app.get("/games/:id", gamesGetGameController);

//Error handler should be the last middleware & after routes
app.use(errorHandler);

export default app;
