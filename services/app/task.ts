import axios from "axios";
// Models
import { TTask, TTaskMember, TUpdateTaskDto } from "@models/task";
// Services
import apiReq from "@services/interceptors/apiThullo";
import { handleErrorMessage } from "@services/error";

export const updateTaskReq = async (
  token: string | null,
  taskId: string,
  payload: TUpdateTaskDto
) => {
  try {
    const response = await apiReq(token).put<TTask>(
      `/task/update/${taskId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const uploadCoverReq = async (
  token: string | null,
  taskId: string,
  payload: FormData
) => {
  try {
    const response = await apiReq(token).put<TTask>(
      `/task/upload/${taskId}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

//******** Add or remove users to task ********//

export const assignUserReq = async (
  token: string | null,
  payload: TTaskMember
) => {
  try {
    const response = await apiReq(token).put<TTask>(
      `/task/assign/member`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const removeUserReq = async (
  token: string | null,
  payload: TTaskMember
) => {
  try {
    const response = await apiReq(token).put<TTask>(
      `/task/remove/member`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
