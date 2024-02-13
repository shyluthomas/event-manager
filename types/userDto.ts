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
type userError = {
  user: null;
  status: number;
};

export type createUserResponseDto = Success | userAlreadyExists | userError;

export type userLoginDto = {
  username: string;
  password: string;
};
