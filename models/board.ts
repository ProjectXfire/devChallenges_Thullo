import { TUser } from "@models/user";
import Joi from "joi";

export type TBoardResponse = {
  pages: number;
  result: TBoard[];
};

export type TBoard = {
  _id: string;
  members: TUser[];
  isPublic: boolean;
  cover: string;
  title: string;
  description: string;
  createdAt: string;
};

export type TBoardForm = {
  title: string;
};

export type TBoardDto = {
  title: string;
  isPublic: boolean;
  description: string;
};

export const BoardSchema = Joi.object<TBoardForm>({
  title: Joi.string().max(30).required().messages({
    "any.required": "The field 'title' must not be empty",
    "string.min": "The field 'title' must have at max 30 characters",
  }),
});
