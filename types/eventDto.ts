
export type EventDto = {
    title: string,
    description: string,
    eventCategoryId: number,
    eventCardImage: string,
    ownerId: number,
    ticketTotalCount: number
}
export type EventGetDto = {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    title: string,
    description: string,
    eventCategoryId: number,
    eventCardImage: string,
    ownerId: number,
    published: boolean,
    ticketTotalCount: number,
    eventItenary: EventItenaryGetDto[]
}

export type EventItenaryDto = {
    schedule: string,
    description: string
}
export type EventItenaryGetDto = EventItenaryDto;

export type EventItenaryCreateDto = EventItenaryDto & {
    eventId: number
}

export type EventCreateDto = EventDto & {
    eventItenary: EventItenaryDto[]
}

type Success = {
    event: EventGetDto;
    status: number;
  };
  type eventAlreadyExists = {
    event: EventGetDto;
    status: number;
  };
  export type eventError = {
    event: null;
    status: number;
  };
  export type createEventResponseDto = Success | eventAlreadyExists | eventError;