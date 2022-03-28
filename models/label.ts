export type TCreateLabelDto = {
  title: string;
  color: string;
  boardId: string;
  listId: string;
  taskId: string;
  authBoardId: string;
};

export type TDeleteLabelDto = {
  taskId: string;
  labelId: string;
  authBoardId: string;
};

export type TLabel = {
  _id: string;
  title: string;
  color: string;
  boardId: string;
  listId: string;
  taskId: string;
};
