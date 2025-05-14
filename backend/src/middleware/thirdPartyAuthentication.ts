import { NextFunction, Request, Response } from "express";
import checkApiStatus from "../services/checkApiStatus.js";

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

export default thirdPartyAuthentication;
