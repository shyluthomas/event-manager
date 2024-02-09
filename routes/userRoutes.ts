import express, { Request, Response } from "express";
import { userController } from "../controllers";
import { requestValidator } from "../middlewares";
import { createUserSchema } from "../schemas";
import { AnyZodObject } from "zod";

export const userRoutes = express.Router();

/* getting User */
userRoutes.get("/", async (req: Request, res: Response) => {
  console.log("/get User", req.body);
});

/* getting Event by ID */
userRoutes.get("/:id", async (req, res) => {
  console.log("/get event by id");
});

/* Create User */
userRoutes.post("/", requestValidator(createUserSchema), async (req, res) => {
  const response = await userController.create(req.body);
  if (response) {
    res.status(response.status).send(response);
  }
});

/* Update User by ID */
userRoutes.patch("/:id", async (req, res) => {
  console.log("/update User");
});

/* Delete User */
userRoutes.delete("/", async (req, res) => {
  console.log("/delete User");
});
