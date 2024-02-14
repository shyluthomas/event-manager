export type genericDto = {
  response: boolean | string | number;
};

export type decodedTokenDto = {
  user: Object;
  exp: number;
  iat: number;
};
