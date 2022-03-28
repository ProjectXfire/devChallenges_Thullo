// Models
import { TCreateLabelDto, TLabel } from "@models/label";
// Services
import apiReq from "@services/interceptors/apiThullo";
import { handleErrorMessage } from "@services/error";

export const updateLabelReq = async (
  token: string | null,
  labelId: string,
  payload: Partial<TCreateLabelDto>
) => {
  try {
    const response = await apiReq(token).put<TLabel>(
      `/label/update/${labelId}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const updateAllLabelsByTaskIdReq = async (
  token: string | null,
  taskId: string,
  listId: string
) => {
  try {
    const response = await apiReq(token).put<TLabel>(
      `/label/update/all/${taskId}`,
      {
        listId,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
