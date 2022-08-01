import { Request } from "express";

declare type UserDto = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

declare type UserRequest = Request & {
  user?: UserDto;
};
