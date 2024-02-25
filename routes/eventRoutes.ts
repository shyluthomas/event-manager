import express from "express";
import { eventController } from "../controllers/eventController";
import { createEventSchema } from "../schemas";
import { requestValidator } from "../middlewares";
import { authtValidator } from "../middlewares/authValidator";

export const eventRoutes = express.Router();

/* getting Events */
eventRoutes.get("/list", async (req, res) => {
  console.log("/get events");
});

/* getting Event by ID */
eventRoutes.get("/:id", async (req, res) => {
  console.log("/get event by id");
});

/* Create Events */
eventRoutes.post(
  "/",
  requestValidator(createEventSchema),
  authtValidator(),
  async (req, res) => {
    const response = await eventController.createEvent(req.body);
    if (response) {
      res.status(response.status).send(response);
    }
  }
);

/* Update Events by ID */
eventRoutes.patch("/:id", async (req, res) => {
  console.log("/update events");
});

/* Delete Events */
eventRoutes.delete("/", async (req, res) => {
  console.log("/delete events");
});
