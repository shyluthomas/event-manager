import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({ required_error: "email is required" })
      .email("invalid email"),
    avatar: z.string({ required_error: "avatar is required" }),
    language: z.string({ required_error: "language is required" }),
    phone: z.string({ required_error: "phone is required" }),
    address: z.string({ required_error: "address is required" }),
    sex: z.string({ required_error: "sex is required" }),
    dob: z.string({ required_error: "dob is required" }),
    username: z.string({ required_error: "username is required" }),
    password: z.string({ required_error: "password is required" }),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Name is required" }),
    password: z.string({ required_error: "Name is required" }),
  }),
});
