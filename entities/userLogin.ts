import { errorHandler } from "../lib";
import { prisma } from "../lib/dbcon";
import helpers from "../lib/helpers";
import { LoginResponseDto, loginDataDto, userLoginDto } from "../types";

export const userLoginEntity = {
  update: async (login: loginDataDto) => {
    const updateLogin = await prisma.login.update({
      where: {
        userId: login.userId,
      },
      data: {
        token: login.token,
        refreshToken: login.refreshToken,
      },
    });
    return updateLogin;
  },
  findUsername: async (user: userLoginDto): Promise<boolean> => {
    let result: boolean = false;
    try {
      const exist = await prisma.login.findFirst({
        where: {
          username: user.username,
        },
      });
      if (exist) {
        return true;
      }
    } catch (e) {
      result = false;
      console.log("error", e);
    }

    return result;
  },
  findPassword: async (user: userLoginDto): Promise<loginDataDto | null> => {
    let loginData: loginDataDto | null = null;
    try {
      loginData = await prisma.login.findFirst({
        where: {
          password: user.password,
        },
      });
      if (loginData) {
        return loginData;
      }
    } catch (e: any) {
      console.log("error", e);
    }
    return loginData;
  },
  findToken: async (token: string): Promise<boolean | null> => {
    let loginData: boolean | null = null;
    try {
      let response = await prisma.login.findFirst({
        where: {
          token: token,
        },
      });
      if (response?.token === token) {
        loginData = true;
        return loginData;
      }
    } catch (e: any) {
      loginData = false;
      console.log("error", e);
    }
    return loginData;
  },
};
