export type MailData = {
  to: string;
  subject: string;
  text: string
}

export type InviteDto = {
  status: boolean;
  inviterId: number;
  eventId: number;
  email: MailData;
};
export type InviteGetDto = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  inviterId: number;
  eventId: number;
  email: string;
};




type Success = {
  invite: InviteGetDto;
  status: number;
};

export type Error = {
  invite: null;
  status: number;
};
export type createInviteResponseDto = Success  | Error;

export type InviteListDto = InviteGetDto &
  {
    status: boolean;
  }[];
export type ListInviteResponseDto = Success | Error;



