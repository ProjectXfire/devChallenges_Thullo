// Models
import {
  TPermission,
  TPermissionResponse,
  TUpdateUserPermissions,
} from "@models/permission";
// Services
import apiReq from "@services/interceptors/apiThullo";
import { handleErrorMessage } from "@services/error";
import { TUserPermissionsByBoard } from "@models/user";

export const getAllPermissionsReq = async (token: string | null) => {
  try {
    const response = await apiReq(token).get<TPermissionResponse>(
      `/auth/permission/list`
    );
    return response.data.result;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const updateUserPermissionsReq = async (
  token: string | null,
  payload: TUpdateUserPermissions
) => {
  try {
    const response = await apiReq(token).put<TPermission>(
      `/permission/update/user`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const getUserPermissionsByBoardReq = async (
  token: string | null,
  userId: string,
  boardId: string
) => {
  try {
    const response = await apiReq(token).get<TUserPermissionsByBoard>(
      `/permission/get/user/${userId}?boardid=${boardId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
