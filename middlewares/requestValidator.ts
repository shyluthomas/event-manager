import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export function requestValidator(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
      });
      return next();
    } catch (e) {
      return res.status(400).json(e);
    }
  };
}
