import { errorHandler, statusCode } from "../lib";
import { prisma } from "../lib/dbcon";
import {
  EventCreateDto,
  EventGetDto,
  createEventResponseDto,
} from "../types/eventDto";

export const eventEntity = {
  createEvent: async (
    event: EventCreateDto
  ): Promise<createEventResponseDto> => {
    let result;
    let status = statusCode.HTTP_SUCESS_CREATED;
    try {
      result = await prisma.event.create({
        data: {
          title: event.title,
          description: event.description,
          eventCategoryId: event.eventCategoryId,
          eventCardImage: event.eventCardImage,
          published: true,
          ownerId: event.ownerId,
          status: true,
          ticketTotalCount: event.ticketTotalCount,
          eventItenary: {
            create: event.eventItenary,
          },
        },
        include: {
          eventItenary: true,
        },
      });
    } catch (e) {
      result = null;
      status = statusCode.HTTP_NOTFOUND;
      console.log("error", e);
    }

    return { event: result, status: status };
  },
};
