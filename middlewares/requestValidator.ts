import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export function requestValidator(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.safeParse({
        body: req.body,
      });
      return next();
    } catch (e) {
      return res.status(400).json(e);
    }
  };
}
