import express from "express";
import { eventController } from "../controllers/eventController";
import {
  createEventSchema,
  getEventSchema,
  updateEventSchema,
} from "../schemas";
import { requestValidator } from "../middlewares";
import { authtValidator } from "../middlewares/authValidator";
import { ListEventResponseDto } from "../types/eventDto";

export const eventRoutes = express.Router();

/* getting Events */
eventRoutes.get("/", authtValidator(), async (req, res) => {
  const response: ListEventResponseDto = await eventController.getEvents();
  res.status(response.status).send(response);
});

/* getting Event by ID */
eventRoutes.get(
  "/:id",
  authtValidator(),
  requestValidator(getEventSchema),
  async (req, res) => {
    const id = req.params.id as string;
    const response: ListEventResponseDto = await eventController.getEvent(
      parseInt(id, 10)
    );
    res.status(response.status).send(response);
  }
);

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
eventRoutes.patch(
  "/:id",
  authtValidator(),
  requestValidator(updateEventSchema),
  async (req, res) => {
    const id = req.params.id as string;
    const data = req.body;
    const response: ListEventResponseDto = await eventController.updateEvent(
      parseInt(id, 10),
      data
    );
    res.status(response.status).send(response);
  }
);

/* Delete Events */
eventRoutes.delete("/", async (req, res) => {
  console.log("/delete events");
});
