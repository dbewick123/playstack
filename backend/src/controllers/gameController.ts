import { Request, Response, NextFunction } from "express";
import { getGameCount, getGamesSearch } from "../services/rawgService.js";

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

const gamesSearchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // TODO: Test this error handling 
    if(!req.query) {
      const error = new Error("Missing search query");
      return next(error); // send to error-handling middleware
    }
    
    const games = await getGamesSearch(req.query);
    
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

export { gameCountController, gamesSearchController };
