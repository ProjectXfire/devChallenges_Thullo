// Models
import {
  TAttachment,
  TAttachmentResponse,
  TCreateAttachmentDto,
} from "@models/attachment";
// Services
import apiReq from "@services/interceptors/apiThullo";
import { handleErrorMessage } from "@services/error";

export const getAllAttachmentByTaskId = async (
  token: string | null,
  taskId: string
) => {
  try {
    const response = await apiReq(token).get<TAttachmentResponse>(
      `/attachment/list/${taskId}`
    );
    return response.data.result;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const createAttachmentReq = async (
  token: string | null,
  payload: FormData,
  authBoardId: string
) => {
  try {
    const response = await apiReq(token).post<TAttachment>(
      `/attachment/upload/file`,
      payload,
      {
        headers: {
          authBoardId,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const deleteAttachmentReq = async (
  token: string | null,
  attachmentId: string,
  imageId: string,
  authBoardId: string
) => {
  try {
    await apiReq(token).delete(
      `/attachment/delete/${attachmentId}?imageId=${imageId}`,
      {
        headers: {
          authBoardId,
        },
      }
    );
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
