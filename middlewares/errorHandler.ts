import { Request, Response, NextFunction } from "express";
import { errorDto } from "../types";

export function errorHandler(
  err: any,
  req: Request,
  res: Response<errorDto>,
  next: NextFunction
) {
  console.error("error");
  res
    .status(err.status || 500)
    .send({ message: err.message || "Internal server Error" });
}
