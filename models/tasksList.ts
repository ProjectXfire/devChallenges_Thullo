import { TTask } from "@models/task";

export type TTasksList = {
  boardId: string;
  tasks: TTask[];
  title: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTasksListDto = {
  boardId: string;
  title: string;
};

export type UpdateTasksListDto = {
  title?: string;
  tasks?: string[];
};

export type TTasksListResponse = {
  result: TTasksList[];
};
