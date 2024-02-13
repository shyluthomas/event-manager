import { userLoginEntity } from "../entities";
import { prisma } from "../lib";
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
        loginResponse = { status: 401 };
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
        loginResponse = { ...newToken, status: 200 };
        return loginResponse;
      }
    } catch (e: any) {
      return { status: 401 };
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
};
