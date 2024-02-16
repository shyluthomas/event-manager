export type createUserDto = {
  name: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  language: string;
  phone: string;
  address: string;
  sex: string;
  dob: string;
  roleId: number;
};

export type userDto = Omit<createUserDto, "username" | "password"> & {
  id: number;
};

type Success = {
  user: userDto;
  status: number;
};
type userAlreadyExists = {
  user: userDto;
  status: number;
};
export type userError = {
  user: null;
  status: number;
};

export type createUserResponseDto = Success | userAlreadyExists | userError;

export type userLoginDto = {
  username: string;
  password: string;
};

export type userGetDto = createUserDto & {
  id: number;
};

export type userGetDtoResponse = {
  user: createUserDto & { id: number };
  status: number;
};
