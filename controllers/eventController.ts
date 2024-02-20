import { eventEntity } from "../entities/event";

import { statusCode } from "../lib";
import { EventCreateDto, createEventResponseDto } from "../types/eventDto";

export const eventController = {
  createEvent: async (event: EventCreateDto): Promise<createEventResponseDto> => {
    const response = await eventEntity.createEvent(event);
    return response;
  },
 

};
