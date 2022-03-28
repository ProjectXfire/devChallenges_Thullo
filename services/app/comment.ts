// Models
import {
  TComment,
  TCommentsResponse,
  TCreateCommentDto,
} from "@models/comment";
// Services
import apiReq from "@services/interceptors/apiThullo";
import { handleErrorMessage } from "@services/error";

export const getAllCommentsByTaskIdReq = async (
  token: string | null,
  taskId: string
) => {
  try {
    const response = await apiReq(token).get<TCommentsResponse>(
      `/comment/list/${taskId}`
    );
    return response.data.result;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const createCommentReq = async (
  token: string | null,
  payload: TCreateCommentDto
) => {
  try {
    const response = await apiReq(token).post<TComment>(
      `/comment/create`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const updateAllCommentsByTaskIdReq = async (
  token: string | null,
  taskId: string,
  payload: Partial<TCreateCommentDto>
) => {
  try {
    const response = await apiReq(token).put<TComment>(
      `/comment/update/all/${taskId}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const removeCommentReq = async (
  token: string | null,
  commentId: string
) => {
  try {
    await apiReq(token).delete(`/comment/remove/${commentId}`);
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
