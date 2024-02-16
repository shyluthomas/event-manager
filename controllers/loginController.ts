import { number } from "zod";
import { userLoginEntity } from "../entities";
import { prisma, statusCode } from "../lib";
import helpers from "../lib/helpers";
import {
  LoginResponseDto,
  LoginResponseErrorDto,
  loginDataDto,
  userLoginDto,
} from "../types";

export const loginController = {
  login: async (
    user: userLoginDto
  ): Promise<LoginResponseDto | LoginResponseErrorDto> => {
    let loginResponse: LoginResponseDto | LoginResponseErrorDto = {
      status: 401,
    };
    try {
      const username = await userLoginEntity.findUsername(user);
      if (!username) {
        loginResponse = { status: statusCode.HTTP_UNAUTHORISED };
        return loginResponse;
      }
      const tokenData: loginDataDto | null = await userLoginEntity.findPassword(
        user
      );
      if (tokenData) {
        const jwtPayload = {
          username: user.username,
          userId: tokenData.userId,
          password: user.password,
        };
        const newToken: any = helpers.generateJwtToken(jwtPayload);
        const updateLogin = userLoginEntity.update({
          id: tokenData.id,
          userId: tokenData.userId,
          token: newToken.token,
          refreshToken: newToken.refreshToken,
        });
        loginResponse = { ...newToken, status: statusCode.HTTP_SUCESS };
        return loginResponse;
      }
    } catch (e: any) {
      return { status: statusCode.HTTP_UNAUTHORISED };
    }

    return loginResponse;
  },
  validateAuthToken: async (token: string): Promise<boolean> => {
    let valid: boolean = false;
    try {
      const tokenResponse: boolean | null = await userLoginEntity.findToken(
        token
      );
      if (tokenResponse) {
        valid = true;
      }
    } catch (e) {
      valid = false;
    }

    return valid;
  },

  refreshToken: async (token: string): Promise<LoginResponseDto> => {
    let response: LoginResponseDto = {
      status: statusCode.HTTP_UNAUTHORISED,
      token: "",
      refreshToken: "",
    };
    const decodeToken = helpers.decodeTokenJWT(token);
    if (decodeToken.status === statusCode.HTTP_UNAUTHORISED) {
      response = {
        status: statusCode.HTTP_UNAUTHORISED,
        token: "",
        refreshToken: "",
      };
      return response;
    }
    const jwtPayload = {
      username: decodeToken.tokenData.user.username,
      userId: decodeToken.tokenData.user.id,
      password: "",
    };
    const newToken: LoginResponseDto = helpers.generateJwtToken(jwtPayload);
    const updateLogin = userLoginEntity.update({
      id: 0,
      userId: decodeToken.tokenData.user.id,
      token: newToken.token,
      refreshToken: newToken.refreshToken,
    });

    response = { ...newToken };

    return response;
  },
};
