import { errorHandler } from "../lib";
import { prisma } from "../lib/dbcon";
import { createUserDto, createUserResponseDto, userDto } from "../types";

export const userEntity = {
  createUser: async (user: createUserDto): Promise<createUserResponseDto> => {
    let result;
    let status = 201;
    try {
      const exist = await prisma.user.findUnique({
        where: {
            email: user.email,
          },
      })
      if(exist) {
        return {user:null,status: 409}
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
          tokens: token,
          userId: result.id,
        },
      });
    } catch (e) {
      result = null;
      status = 404;
      console.log("error", e);
    }

    return { user: result, status: status };
  },
  updateUser: async () => {},
  deleteuser: async (params: any) => {},
};
