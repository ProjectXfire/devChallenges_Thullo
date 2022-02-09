import axios from "axios";
// Models
import { TTask, TTaskMember, TUpdateTaskDto } from "@models/task";
// Services
import { handleErrorMessage } from "@services/error";

export const updateTaskReq = async (
  baseUrl: string,
  token: string,
  taskId: string,
  payload: TUpdateTaskDto
) => {
  try {
    const response = await axios.put<TTask>(
      `${baseUrl}/task/update/${taskId}`,
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
  baseUrl: string,
  token: string,
  taskId: string,
  payload: FormData
) => {
  try {
    const response = await axios.put<TTask>(
      `${baseUrl}/task/upload/${taskId}`,
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

//******** Add or remove users to task ********//

export const assignUserReq = async (
  baseUrl: string,
  token: string,
  payload: TTaskMember
) => {
  try {
    const response = await axios.put<TTask>(
      `${baseUrl}/task/assign/member`,
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

export const removeUserReq = async (
  baseUrl: string,
  token: string,
  payload: TTaskMember
) => {
  try {
    const response = await axios.put<TTask>(
      `${baseUrl}/task/remove/member`,
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
