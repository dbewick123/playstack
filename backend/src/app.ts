
import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import thirdPartyAuthentication from "./middleware/thirdPartyAuthentication.js";
import {
  gameCountController,
  gamesTextSearchController,
} from "./controllers/gameController.js";

const app = express();
app.use(cors());

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

app.get("/games/search/:query/:exact", gamesTextSearchController);

//Error handler should be the last middleware & after routes
app.use(errorHandler);

export default app;
