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
import { InviteDto, InviteGetDto, ListInviteResponseDto, createInviteResponseDto } from "../types/inviteDto";
import { inviteEntity } from "../entities/invite";
const uploadPath = "uploads";

export const inviteController = {
  createInvite: async (
    invite: InviteDto
  ): Promise<createInviteResponseDto> => {
    let response: createInviteResponseDto = { invite: null, status: 400 };
    try {
    
      const inviteData: createInviteResponseDto = await inviteEntity.createInvite(
        invite
      );
      response = { invite: inviteData.invite, status: inviteData.status };
    } catch (e) {
      console.log(e);
      return { invite: null, status: 400 };
    }
    return response;
  },
  getInvites: async (id:number): Promise<ListInviteResponseDto> => {
    const response: InviteGetDto = await inviteEntity.getInvites(id);
    if (!response) {
      return { status: statusCode.HTTP_NOTFOUND, invite: null };
    }
    return { status: statusCode.HTTP_SUCESS, invite: response };
  },
  updateInvite: async (id: number, data: any): Promise<ListEventResponseDto> => {
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
