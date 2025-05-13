// global error handler, should run at the end of the middleware stack

import type { Request, Response, NextFunction } from "express";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[Error] ${err.name}: ${err.message}`);
  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
}

module.exports =  errorHandler ;

