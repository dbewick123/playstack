import type { Request, Response, NextFunction } from "express";
const checkApiStatus = require("../services/checkApiStatus");

async function thirdPartyAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const externalServicesUp = await checkApiStatus();
    if (externalServicesUp !== 200) {
      throw new Error("External services are down");
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = thirdPartyAuthentication; 
