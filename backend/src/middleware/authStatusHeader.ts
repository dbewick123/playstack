import { Request, Response, NextFunction } from "express";

// Stamps every response with the session's auth state to allow client to see even on public routes.
function authStatusHeader(req: Request, res: Response, next: NextFunction) {
  res.setHeader("X-Authenticated", req.session.userId ? "true" : "false");
  next();
}

export default authStatusHeader;
