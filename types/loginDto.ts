export type usernameDto = {
  username: string;
};
export type passwordDto = {
  password: string;
};

export type loginDto = usernameDto & passwordDto;

export type LoginResponseDto = {
  token: string;
  refreshToken: string;
  status: number;
};
export type LoginResponseErrorDto = {
  status: number;
};
export type loginDataDto = {
  token: string;
  refreshToken: string;
  id: number;
  userId: number;
};

export type userJwtDto = usernameDto & passwordDto & { userId: number };
