import axios from "axios";
// Models
import {
  UserRegisterDto,
  TUserResponse,
  TUser,
  UserUpdateDto,
} from "@models/user";
// Services
import { handleErrorMessage } from "@services/error";

export const registerReq = async (
  baseUrl: string,
  payload: UserRegisterDto
) => {
  try {
    const response = await axios.post<TUserResponse>(
      `${baseUrl}/user/create`,
      payload
    );
    return response.data.message;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const getUserReq = async (baseUrl: string, token: string) => {
  try {
    const response = await axios.get<TUser>(`${baseUrl}/user/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

// Using form data (Sending with input file)
export const updateUserFormDataReq = async (
  baseUrl: string,
  token: string,
  formData: FormData
) => {
  try {
    const response = await axios.put<TUserResponse>(
      `${baseUrl}/user/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

// Using json (Sending without input file)
export const updateUserReq = async (
  baseUrl: string,
  token: string,
  payload: UserUpdateDto
) => {
  try {
    const response = await axios.put<TUserResponse>(
      `${baseUrl}/user/update`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const uploadAvatarReq = async (
  baseUrl: string,
  token: string,
  file: FormData
) => {
  try {
    await axios.post(`${baseUrl}/user/upload`, file, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const removeAvatarReq = async (
  baseUrl: string,
  token: string,
  fileId: string
) => {
  try {
    await axios.post(
      `${baseUrl}/user/remove/avatar`,
      { avatarId: fileId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const searchUsersReq = async (
  baseUrl: string,
  token: string,
  searchValue: string
) => {
  try {
    const response = await axios.get<TUser[]>(
      `${baseUrl}/user/list?search=${searchValue}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
