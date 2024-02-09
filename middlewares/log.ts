import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  const timestamp = Date.now();
  console.log(`${timestamp} : ${req.method} : ${req.originalUrl}`);
  next();
}
