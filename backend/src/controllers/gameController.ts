import type { Request, Response, NextFunction } from "express";
const rawgService = require("../services/rawgService");

const getGameCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gameCount = await rawgService.getGameCount();
    res.status(200).json({ count: gameCount });
  } catch (error) {
    next(error);
  }
};

const getGamesTextSearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exact = req.params.exact === 'true';
    const games = await rawgService.getGamesTextSearch(req.params.query, exact);
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

module.exports = { getGameCount, getGamesTextSearch };