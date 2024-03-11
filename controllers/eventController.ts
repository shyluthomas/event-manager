import { eventEntity } from "../entities/event";

import { statusCode, tokenHandler, upload } from "../lib";
import * as fs from "fs";
import * as path from "path";
import {
  EventCreateDto,
  EventGetResponseDto,
  EventListDto,
  ListEventResponseDto,
  createEventResponseDto,
  deleteEventResponseDto,
} from "../types/eventDto";
import helpers from "../lib/helpers";
import { decodedTokenDetailsDto } from "../types";
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
  getEvents: async (): Promise<ListEventResponseDto> => {
    const tokenData: decodedTokenDetailsDto = tokenHandler.tokenData;
    const userId: number = tokenData.user.id;
    const response: EventListDto = await eventEntity.getEvents(userId);
    if (!response) {
      return { status: statusCode.HTTP_NOTFOUND, event: null };
    }
    return { status: statusCode.HTTP_SUCESS, event: response };
  },
  getEvent: async (id: number): Promise<ListEventResponseDto> => {
    const response: EventGetResponseDto = await eventEntity.getEvent(id);
    if (!response) {
      return { status: statusCode.HTTP_NOTFOUND, event: null };
    }
    return { status: statusCode.HTTP_SUCESS, event: response };
  },
  updateEvent: async (id: number, data: any): Promise<ListEventResponseDto> => {
    const response: createEventResponseDto = await eventEntity.updateEvent(
      id,
      data
    );
    if (!response) {
      return { status: statusCode.HTTP_NOTFOUND, event: null };
    }
    return { status: statusCode.HTTP_SUCESS, event: response.event };
  },
  deleteEvent: async (id: number): Promise<deleteEventResponseDto> => {
    const response: deleteEventResponseDto = await eventEntity.deleteEvent(id);
    if (response.status != 200) {
      return { status: statusCode.HTTP_NOTFOUND };
    }
    return { status: statusCode.HTTP_SUCESS };
  },
};
