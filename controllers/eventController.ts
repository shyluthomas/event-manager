import { eventEntity } from "../entities/event";

import { statusCode, upload } from "../lib";
import * as fs from "fs";
import * as path from "path";
import { EventCreateDto, createEventResponseDto } from "../types/eventDto";
import helpers from "../lib/helpers";
const uploadPath = "uploads";

export const eventController = {
  createEvent: async (
    event: EventCreateDto
  ): Promise<createEventResponseDto> => {
    let response: createEventResponseDto = { event: null, status: 400 };
    try {
      const fileName = "-event.jpeg";
      const uploadPath = "uploads/events/";
      const eventImage = await helpers.fileUpload(
        fileName,
        uploadPath,
        event.file
      );
      event.eventCardImage = eventImage;
      const eventData: createEventResponseDto = await eventEntity.createEvent(
        event
      );
      response = { event: eventData.event, status: eventData.status };
    } catch (e) {
      console.log(e);
      return { event: null, status: 400 };
    }
    return response;
  },
};
