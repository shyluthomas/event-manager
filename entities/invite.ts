import { date } from "zod";
import { errorHandler, statusCode } from "../lib";
import { prisma } from "../lib/dbcon";
import {
  EventCreateDto,
  createEventResponseDto,
  deleteEventResponseDto,
} from "../types/eventDto";
import { InviteDto, createInviteResponseDto } from "../types/inviteDto";

export const inviteEntity = {
  createInvite: async (
    invite: InviteDto
  ): Promise<createInviteResponseDto> => {
    let result;
    let status = statusCode.HTTP_SUCESS_CREATED;
    try {
      result = await prisma.invite.create({
        data: {
          status: invite.status,
          inviterId: invite.inviterId,
          eventId: invite.eventId,
          email: JSON.stringify(invite.email),
          ticket: {
            create: {
              status: true,
              ticketCode: Date.now().toString(),
            }
          }
        },
        include: {
          ticket: true,
        },
      });
    } catch (e) {
      result = null;
      status = statusCode.HTTP_NOTFOUND;
      console.log("error ee", e);
    }

    return { invite: result, status: status };
  },
  getInvites: async (id: number): Promise<any> => {
    try {
      const invites = await prisma.invite.findMany({
        where: {
          eventId: id,
        },
        include: {
          ticket: true,
        },
      });
      return invites;
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
  deleteEvent: async (id: number): Promise<deleteEventResponseDto> => {
    let respone = { status: 404 };
    try {
      const data = await prisma.event.delete({
        where: {
          id: id,
        },
      });
      if (data) {
        respone = { status: 200 };
      }
    } catch (e) {
      respone = { status: 404 };
    }
    return respone;
  },
};
