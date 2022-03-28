export type TAttachmentResponse = {
  result: TAttachment[];
};

export type TAttachment = {
  listId: string;
  boardId: string;
  taskId: string;
  file: string;
  fileType: string;
  mimetype: string;
  originalname: string;
  imageId: string;
  imageURL: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type TCreateAttachmentDto = {
  boardId: string;
  listId: string;
  taskId: string;
  fileType: string;
};
