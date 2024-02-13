import { Request, Response, NextFunction } from "express";
import { loginController } from "../controllers";

export function authtValidator() {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const headerToken = req?.headers["authorization"] || "";
      const token = headerToken.split(" ")[1];
      const validate: boolean = await loginController.validateAuthToken(token);
      if (validate) {
        return next();
      }
    } catch (e) {
      return res.status(401).json(e);
    }
  };
}
