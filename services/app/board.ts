import axios from "axios";
// Models
import { TBoard, TBoardDto, TBoardResponse } from "@models/board";
// Services
import apiReq from "@services/interceptors/apiThullo";
import { handleErrorMessage } from "@services/error";

export const getBoardsReq = async (
  token: string,
  limit: number,
  page: number
) => {
  try {
    const response = await apiReq(token).get<TBoardResponse>(
      `/board/list?limit=${limit}&page=${page}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const getBoardReq = async (token: string | null, boardId: string) => {
  try {
    const response = await apiReq(token).get<TBoard>(`/board/get/${boardId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const createBoardReq = async (
  token: string | null,
  payload: FormData
) => {
  try {
    const response = await apiReq(token).post<TBoard>(`/board/create`, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const updateBoardReq = async (
  token: string | null,
  boardId: string,
  payload: TBoardDto
) => {
  try {
    const response = await apiReq(token).put<TBoard>(
      `/board/update/${boardId}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const findUserInBoardReq = async (
  token: string | null,
  boardId: string
) => {
  try {
    const response = await apiReq(token).get<boolean>(
      `/board/find/member/${boardId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

//******** Removing or adding members to the board ********//

export const removeMemberReq = async (
  token: string | null,
  boardId: string,
  userId: string
) => {
  try {
    const response = await apiReq(token).put<TBoard>(`/board/remove/member`, {
      boardId: boardId,
      member: userId,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const addMemberReq = async (
  token: string | null,
  boardId: string,
  userId: string
) => {
  try {
    const response = await apiReq(token).put<TBoard>(`/board/assign/member`, {
      boardId: boardId,
      member: userId,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
