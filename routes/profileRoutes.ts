import express, { Request, Response } from "express";
import { userController } from "../controllers";
import { authtValidator } from "../middlewares/authValidator";
import { userError, userGetDtoResponse } from "../types";

export const profileRoutes = express.Router();

/* getting Event by ID */
profileRoutes.get("/", authtValidator(), async (req, res) => {
  const response = (await userController.getProfile()) as
    | userGetDtoResponse
    | userError;
  res.status(response.status).send(response);
});
