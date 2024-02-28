import { number } from "zod";
import { tokenDecodeRepsonseDetailsDto } from "../types";

export const tokenHandler: tokenDecodeRepsonseDetailsDto = {
  status: 0,
  message: "",
  tokenData: { user: { username: "", id: 0 }, exp: 0, iat: 0 },
};
