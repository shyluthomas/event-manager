import express, { Request, Response } from "express";
import { loginController, userController } from "../controllers";
import { requestValidator } from "../middlewares";
import { loginSchema } from "../schemas";

export const authRoutes = express.Router();

/* getting User */
authRoutes.get("/", async (req: Request, res: Response) => {
  console.log("/get User", req.body);
});

/* getting Event by ID */
authRoutes.get("/:id", async (req, res) => {
  console.log("/get event by id");
});

authRoutes.post("/", requestValidator(loginSchema), async (req, res) => {
  const response = await loginController.login(req.body);
  if (response) {
    res.status(response.status).send(response);
  }
});

/* Update User by ID */
authRoutes.patch("/:id", async (req, res) => {
  console.log("/update User");
});

/* Delete User */
authRoutes.delete("/", async (req, res) => {
  console.log("/delete User");
});
