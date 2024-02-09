import { userEntity } from "../entities";
import { createUserDto, createUserResponseDto } from "../types";

export const userController = {
  create: async (user: createUserDto): Promise<createUserResponseDto> => {
    const response = await userEntity.createUser(user);
    return response;
  },
};
