import { userEntity } from "../entities";
import { createUserDto, createUserResponseDto, userGetDto } from "../types";

export const userController = {
  create: async (user: createUserDto): Promise<createUserResponseDto> => {
    const response = await userEntity.createUser(user);
    return response;
  },
  getUser: async (id: number): Promise<userGetDto | null> => {
    const response = await userEntity.getUser(id);
    return response;
  },
  updateUser: async (
    id: number,
    data: userGetDto
  ): Promise<userGetDto | null> => {
    const response = await userEntity.updateUser(id, data);
    return response;
  },
};
