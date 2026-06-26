import { Request, Response, NextFunction } from "express";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    res.status(401).json({ status: "error", message: "Unauthorised" });
    return;
  }
  next();
}

export default requireAuth;
