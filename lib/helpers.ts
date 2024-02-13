import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { LoginResponseDto, userJwtDto } from "../types";
import config from "./config";

const helpers = {
  generateJwtToken: (userData: userJwtDto): LoginResponseDto => {
    const user = {
      id: userData.userId,
      username: userData.username,
    };
    const secretKey = config.SECRET_KEY;
    const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: "1d" });

    return {
      token,
      refreshToken,
      status: 201,
    };
  },
};

export default helpers;
