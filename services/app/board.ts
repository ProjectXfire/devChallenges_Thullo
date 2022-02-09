import axios from "axios";
// Models
import { TBoard, TBoardDto, TBoardResponse } from "@models/board";
// Services
import { handleErrorMessage } from "@services/error";

export const getBoardsReq = async (
  baserUrl: string,
  token: string,
  limit: number,
  page: number
) => {
  try {
    const response = await axios.get<TBoardResponse>(
      `${baserUrl}/board/list?limit=${limit}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const getBoardReq = async (
  baseUrl: string,
  token: string,
  boardId: string
) => {
  try {
    const response = await axios.get<TBoard>(
      `${baseUrl}/board/get/${boardId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const createBoardReq = async (
  baseUrl: string,
  token: string,
  payload: FormData
) => {
  try {
    const response = await axios.post<TBoard>(
      `${baseUrl}/board/create`,
      payload,
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

export const updateBoardReq = async (
  baseUrl: string,
  token: string,
  boardId: string,
  payload: TBoardDto
) => {
  try {
    const response = await axios.put<TBoard>(
      `${baseUrl}/board/update/${boardId}`,
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

export const findUserInBoardReq = async (
  baseUrl: string,
  token: string,
  boardId: string
) => {
  try {
    const response = await axios.get<boolean>(
      `${baseUrl}/board/find/member/${boardId}`,
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

//******** Removing or adding members to the board ********//

export const removeMemberReq = async (
  baseUrl: string,
  token: string,
  boardId: string,
  userId: string
) => {
  try {
    const response = await axios.put<TBoard>(
      `${baseUrl}/board/remove/member`,
      {
        boardId: boardId,
        member: userId,
      },
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

export const addMemberReq = async (
  baseUrl: string,
  token: string,
  boardId: string,
  userId: string
) => {
  try {
    const response = await axios.put<TBoard>(
      `${baseUrl}/board/assign/member`,
      {
        boardId: boardId,
        member: userId,
      },
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
