import { TLabel } from "./label";
import { TUser } from "./user";

export type TTaskResponse = {
  result: TTask[];
};

export type TTask = {
  _id: string;
  boardId: string;
  listId: string;
  labels: TLabel[];
  members: TUser[];
  description: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  cover: string;
  coverId: string;
  countAttachments: number;
  countComments: number;
  __v: number;
};

export type TCreateTaskDto = {
  title: string;
  listId: string;
  boardId: string;
  authBoardId: string;
};

export type TUpdateTaskDto = {
  title?: string;
  listId?: string;
  description?: string;
  authBoardId: string;
};

export type TDeleteTaskDto = {
  listId: string;
  taskId: string;
  authBoardId: string;
};

export type TTaskMember = {
  taskId: string;
  userId: string;
  authBoardId: string;
};
