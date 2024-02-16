import { errorHandler, statusCode } from "../lib";
import { prisma } from "../lib/dbcon";
import { createUserDto, createUserResponseDto, userGetDto } from "../types";

export const userEntity = {
  createUser: async (user: createUserDto): Promise<createUserResponseDto> => {
    let result;
    let status = statusCode.HTTP_SUCESS_CREATED;
    try {
      const exist = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (exist) {
        return { user: null, status: statusCode.HTTP_CONFLICT };
      }
      result = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          language: user.language,
          phone: user.phone,
          address: user.address,
          dob: user.dob,
          sex: user.sex,
          roleId: user.roleId,
        },
      });

      const token = Math.random().toString();
      const loginResult = await prisma.login.create({
        data: {
          username: user.username,
          password: user.password,
          token: "",
          refreshToken: "",
          userId: result.id,
        },
      });
    } catch (e) {
      result = null;
      status = statusCode.HTTP_NOTFOUND;
      console.log("error", e);
    }

    return { user: result, status: status };
  },
  getUser: async (id: number): Promise<userGetDto | null> => {
    const user = (await prisma.user.findUnique({
      where: {
        id: id,
      },
    })) as userGetDto;
    return user;
  },
  updateUser: async (
    id: number,
    data: userGetDto
  ): Promise<userGetDto | null> => {
    try {
      const user = (await prisma.user.findUnique({
        where: {
          id: id,
        },
      })) as userGetDto;
      if (!user) {
        return null;
      }
      const update = await prisma.user.update({
        where: {
          id: id,
        },
        data: data,
      });
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  deleteUser: async (id: number): Promise<userGetDto | null> => {
    const user = (await prisma.user.findUnique({
      where: {
        id: id,
      },
    })) as userGetDto;

    if (!user) {
      return null;
    }
    try {
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      console.log(e);
      return null;
    }

    return user;
  },
};
