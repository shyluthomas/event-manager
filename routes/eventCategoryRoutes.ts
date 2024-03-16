import express from "express";
import { eventController } from "../controllers/eventController";
import {
  createEventSchema,
  getEventSchema,
  updateEventSchema,
} from "../schemas";
import { authtValidator } from "../middlewares/authValidator";
import {
  ListEventResponseDto,
} from "../types/eventDto";
import { eventCatController } from "../controllers";

export const eventCategoryRoutes = express.Router();

/* getting Events */
eventCategoryRoutes.get("/", authtValidator(), async (req, res) => {
  const response:any = await eventCatController.getEventCategory();
  res.status(response.status).send(response);
});

