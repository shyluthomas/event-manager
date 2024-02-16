import { userEntity } from "../entities";
import {
  createUserDto,
  createUserResponseDto,
  userError,
  userGetDto,
  userGetDtoResponse,
} from "../types";
import { statusCode } from "../lib";

export const userController = {
  create: async (user: createUserDto): Promise<createUserResponseDto> => {
    const response = await userEntity.createUser(user);
    return response;
  },
  getUser: async (id: number): Promise<userGetDtoResponse | userError> => {
    const response = await userEntity.getUser(id);
    if (!response) {
      return { status: statusCode.HTTP_NOTFOUND, user: null };
    }
    return { status: statusCode.HTTP_SUCESS, user: response };
  },
  updateUser: async (
    id: number,
    data: userGetDto
  ): Promise<userGetDto | null> => {
    const response = await userEntity.updateUser(id, data);
    return response;
  },
  deleteUser: async (id: number): Promise<userGetDtoResponse | userError> => {
    const response = await userEntity.deleteUser(id);
    if (!response) {
      return { status: statusCode.HTTP_NOTFOUND, user: response };
    }
    return { status: statusCode.HTTP_SUCESS, user: response };
  },
};
