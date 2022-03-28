import { TUser } from "./user";

export type TCommentsResponse = {
  result: TComment[];
};

export type TCreateCommentDto = {
  comment: string;
  boardId: string;
  listId: string;
  taskId: string;
};

export type TComment = {
  _id: string;
  comment: string;
  boardId: string;
  listId: string;
  taskId: string;
  createdBy: TUser;
  createdAt: string;
};
