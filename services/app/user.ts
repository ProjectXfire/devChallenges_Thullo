// Models
import {
  UserRegisterDto,
  TUserResponse,
  TUser,
  UserUpdateDto,
} from "@models/user";
// Services
import { handleErrorMessage } from "@services/error";
import apiReq from "@services/interceptors/apiThullo";

export const registerReq = async (payload: UserRegisterDto) => {
  try {
    const response = await apiReq(null).post<TUserResponse>(
      `/user/create`,
      payload
    );
    return response.data.message;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const getUserReq = async (token: string) => {
  try {
    const response = await apiReq(token).get<TUser>(`/user/get`);
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

// Using form data (Sending with input file)
export const updateUserFormDataReq = async (formData: FormData) => {
  try {
    const response = await apiReq(null).put<TUserResponse>(
      `/user/update`,
      formData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

// Using json (Sending without input file)
export const updateUserReq = async (payload: UserUpdateDto) => {
  try {
    const response = await apiReq(null).put<TUserResponse>(
      `/user/update`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const searchUsersReq = async (
  token: string | null,
  searchValue: string
) => {
  try {
    const response = await apiReq(token).get<TUser[]>(
      `/user/list?search=${searchValue}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
