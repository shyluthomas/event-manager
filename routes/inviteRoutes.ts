import express from "express";
import { eventController } from "../controllers/eventController";
import {
  createEventSchema,
  getEventSchema,
  updateEventSchema,
} from "../schemas";
import { requestValidator } from "../middlewares";
import { authtValidator } from "../middlewares/authValidator";
import {
  ListEventResponseDto,
  deleteEventResponseDto,
} from "../types/eventDto";
import { ListInviteResponseDto } from "../types/inviteDto";
import { inviteController } from "../controllers/inviteController";

export const inviteRoutes = express.Router();

/* getting Events */
inviteRoutes.get("/:id", async (req, res) => {
  const id = req.params.id as string;
  const response: ListInviteResponseDto = await inviteController.getInvites(parseInt(id,10));
  res.status(response.status).send(response);
});



/* Create Events */
inviteRoutes.post(
  "/",
  // requestValidator(createEventSchema),
  // authtValidator(),
  async (req, res) => {
    const response = await inviteController.createInvite(req.body);
    if (response) {
      res.status(response.status).send(response);
    }
  }
);

