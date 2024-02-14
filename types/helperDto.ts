import { decodedTokenDto } from "./genericDto";

export type tokenDecodeRepsonseDto = {
  status: number;
  message: string;
  tokenData: decodedTokenDto;
};

export type user = {
  username: string;
  id: number;
};
export type decodedTokenDetailsDto = {
  user: user;
  exp: number;
  iat: number;
};

export type tokenDecodeRepsonseDetailsDto = {
  status: number;
  message: string;
  tokenData: decodedTokenDetailsDto;
};
