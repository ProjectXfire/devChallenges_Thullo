export type TTaskResponse = {
  result: TTask[];
};

export type TTask = {
  _id: string;
  boardId: string;
  listId: string;
  labels: any[];
  members: any[];
  description: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  cover: string;
  coverId: string;
  __v: number;
};

export type TCreateTaskDto = {
  title: string;
  listId: string;
  boardId: string;
};

export type TUpdateTaskDto = {
  title?: string;
  listId?: string;
  description?: string;
};

export type TDeleteTaskDto = {
  listId: string;
  taskId: string;
};

export type TTaskMember = {
  taskId: string;
  userId: string;
};
