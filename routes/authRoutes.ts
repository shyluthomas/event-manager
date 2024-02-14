import express, { Request, Response } from "express";
import { loginController, userController } from "../controllers";
import { requestValidator } from "../middlewares";
import { loginSchema } from "../schemas";
export const authRoutes = express.Router();

authRoutes.post("/", requestValidator(loginSchema), async (req, res) => {
  const response = await loginController.login(req.body);
  if (response) {
    res.status(response.status).send(response);
  }
});

/* Update User by ID */
authRoutes.post("/refresh", async (req, res) => {
  const token = req.body.refreshToken;
  const newToken = await loginController.refreshToken(token);
  res.status(newToken.status).json({
    token: newToken.token,
    refreshToken: newToken.refreshToken,
  });
});

/* Delete User */
authRoutes.delete("/", async (req, res) => {
  console.log("/delete User");
});
