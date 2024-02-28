import { Request, Response, NextFunction } from "express";
import { loginController } from "../controllers";
import helpers from "../lib/helpers";
import { tokenHandler } from "../lib";

export function authtValidator() {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const headerToken = req?.headers["authorization"] || "";
      const token = headerToken.split(" ")[1];

      const decodeToken = helpers.decodeTokenJWT(token);
      if (decodeToken.status === 401) {
        return res.status(decodeToken.status).json(decodeToken);
      }
      const validate: boolean = await loginController.validateAuthToken(token);
      if (validate) {
        /* set the token for future read */
        tokenHandler.tokenData = decodeToken.tokenData;
        return next();
      }
    } catch (e) {
      return res.status(401).json(e);
    }
  };
}
