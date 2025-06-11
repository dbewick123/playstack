import { Request, Response, NextFunction } from "express";
import {
  getGameCount,
  getGame,
  getGamesSearch,
  getNextGamesPage,
} from "../services/rawgService.js";

const gameCountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameCount = await getGameCount();
    res.status(200).json({ count: gameCount });
  } catch (error) {
    next(error);
  }
};

const gamesGetGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Test this error handling
    if (!req.params) {
      const error = new Error("Missing required params");
      return next(error); // send to error-handling middleware
    }

    if(!req.params.id) {
      const error = new Error("Missing required params");
      return next(error); // send to error-handling middleware
    }

    const results = await getGame(Number(req.params.id));
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

const gamesSearchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Test this error handling
    if (!req.query) {
      const error = new Error("Missing search query");
      return next(error); // send to error-handling middleware
    }

    const results = await getGamesSearch(req.query);

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

//TODO: Test this and the service it calls (same test probs)
const gamesNextPageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    if (!req.query) {
      const error = new Error("URL missing");
      return next(error); // send to error-handling middleware
    }

    const targetUrl = req.query.targetUrl;

    if (typeof targetUrl !== "string") {
      const error = new Error("URL not properly formed");
      return next(error); // send to error-handling middleware
    }

    let decodedUrl: string;
    try {
      decodedUrl = decodeURIComponent(targetUrl);
    } catch (error) {
      return next(error); // send to error-handling middleware
    }
    const results = await getNextGamesPage(decodedUrl);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export { gameCountController, gamesGetGameController, gamesNextPageController, gamesSearchController };
