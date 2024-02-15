import express, { Request, Response } from "express";
import { userController } from "../controllers";
import { requestValidator } from "../middlewares";
import {
  createUserSchema,
  getUserSchema,
  loginSchema,
  updateUserSchema,
} from "../schemas";
import { authtValidator } from "../middlewares/authValidator";
import { userGetDto } from "../types";

export const userRoutes = express.Router();

/* getting User */
userRoutes.get("/", async (req: Request, res: Response) => {
  console.log("/get User", req.body);
});

/* getting Event by ID */
userRoutes.get(
  "/:id",
  requestValidator(getUserSchema),
  authtValidator(),
  async (req, res) => {
    const id = req.params.id as string;
    const response = await userController.getUser(parseInt(id, 10));
    res.status(200).send(response);
  }
);

/* Create User */
userRoutes.post("/", requestValidator(createUserSchema), async (req, res) => {
  const response = await userController.create(req.body);
  if (response) {
    res.status(response.status).send(response);
  }
});

/* Update User by ID */
userRoutes.patch(
  "/:id",
  requestValidator(updateUserSchema),
  authtValidator(),
  async (req, res) => {
    const id = req.params.id as string;
    const data = req.body as userGetDto;
    const response = await userController.updateUser(parseInt(id, 10), data);
    res.status(200).send(response);
  }
);

/* Delete User */
userRoutes.delete("/", async (req, res) => {
  console.log("/delete User");
});
