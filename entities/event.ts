import { errorHandler, statusCode } from "../lib";
import { prisma } from "../lib/dbcon";
import {
  EventCreateDto,
  EventGetDto,
  EventListDto,
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
  getEvents: async (id: number): Promise<any> => {
    try {
      const events = await prisma.event.findMany({
        where: {
          ownerId: id,
        },
        include: {
          eventItenary: {
            select: {
              schedule: true,
              description: true,
            },
          },
        },
      });
      return events;
    } catch (e) {
      return null;
    }
  },
  getEvent: async (id: number): Promise<any> => {
    console.log("first", id);
    try {
      const events = await prisma.event.findUnique({
        where: {
          id: id,
        },
        include: {
          eventItenary: {
            select: {
              schedule: true,
              description: true,
            },
          },
        },
      });
      return events;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  updateEvent: async (
    id: number,
    event: EventCreateDto
  ): Promise<createEventResponseDto> => {
    let result;
    let status = statusCode.HTTP_SUCESS_CREATED;
    try {
      result = await prisma.event.update({
        where: {
          id: id,
        },
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
