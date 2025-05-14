import { Request, Response, NextFunction } from "express";
import { getGameCount, getGamesTextSearch } from "../services/rawgService.js";

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

const gamesTextSearchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exact = req.params.exact === "true";
    const games = await getGamesTextSearch(req.params.query, exact);
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

export { gameCountController, gamesTextSearchController };
