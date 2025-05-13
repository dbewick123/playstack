const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const thirdPartyAuthentication = require("./middleware/thirdPartyAuthentication");
const gameController = require("./controllers/gameController");

import type { Request, Response } from "express";

const app = express();

// Middleware
app.use(express.json());
app.use(thirdPartyAuthentication);

// Only using for testing
  app.get("/error", (req: Request, res: Response) => {
    throw new Error("This is a test error");
  });

  app.get("/errorblank", (req: Request, res: Response) => {
    throw new Error();
  });

// Main routes
  app.get("/", (req: Request, res: Response) => {
    res.send("Node Server is up and running!");
  });

  app.get("/games/count", gameController.getGameCount);

  app.get("/games/search/:query/:exact", gameController.getGamesTextSearch);



//Error handler should be the last middleware & after routes
app.use(errorHandler);

module.exports = app;
