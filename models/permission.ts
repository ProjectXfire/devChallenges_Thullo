export type TPermissionResponse = {
  result: TPermission[];
};

export type TPermission = {
  _id: string;
  name: string;
  key: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TUpdateUserPermissions = {
  userId: string;
  boardId: string;
  permissions: string[];
  authBoardId: string;
};
