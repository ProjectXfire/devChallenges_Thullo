import Joi, { string } from "joi";

export type TUserResponse = {
  message: string;
};

export type UserLoginDto = {
  email: string;
  password: string;
};

export type UserRegisterDto = {
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
};

export type UserUpdateDto = {
  username: string;
  name: string;
  lastname: string;
};

export type TUser = {
  _id: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  avatar: string;
  avatarId: string;
  completeName: string;
};

export const UserLoginSchema = Joi.object<UserLoginDto>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "The field 'email' must not be empty",
      "string.email": "The field must be an valid email",
    }),
  password: Joi.string().min(8).required().messages({
    "any.required": "The field 'password' must not be empty",
    "string.min": "The field 'password' must have at least 8 characters",
  }),
});

export const UserRegisterSchema = Joi.object<UserRegisterDto>({
  username: Joi.string().max(15).required().messages({
    "any.required": "The field 'username' must not be empty",
    "string.max": "The field 'username' must have at max 15 characters",
  }),
  name: Joi.string().required().messages({
    "any.required": "The field 'name' must not be empty",
  }),
  lastname: Joi.string().required().messages({
    "any.required": "The field 'lastname' must not be empty",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "The field 'email' must not be empty",
      "string.email": "The field must be an valid email",
    }),
  password: Joi.string().min(8).required().messages({
    "any.required": "The field 'password' must not be empty",
    "string.min": "The field 'password' must have at least 8 characters",
  }),
});

export const UserUpdateSchema = Joi.object<UserUpdateDto>({
  username: Joi.string().max(15).required().messages({
    "any.required": "The field 'username' must not be empty",
    "string.max": "The field 'username' must have at max 15 characters",
  }),
  name: Joi.string().required().messages({
    "any.required": "The field 'name' must not be empty",
  }),
  lastname: Joi.string().required().messages({
    "any.required": "The field 'lastname' must not be empty",
  }),
});
