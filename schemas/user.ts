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

export const getUserSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "user id is required" }),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "user id is required" }),
  }),
  body: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    email: z
      .string({ required_error: "email is required" })
      .email("invalid email")
      .optional(),
    avatar: z.string({ required_error: "avatar is required" }).optional(),
    language: z.string({ required_error: "language is required" }).optional(),
    phone: z.string({ required_error: "phone is required" }).optional(),
    address: z.string({ required_error: "address is required" }).optional(),
    sex: z.string({ required_error: "sex is required" }).optional(),
    dob: z.string({ required_error: "dob is required" }).optional(),
    username: z.string({ required_error: "username is required" }).optional(),
    password: z.string({ required_error: "password is required" }).optional(),
  }),
});
