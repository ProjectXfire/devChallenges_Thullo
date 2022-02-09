import axios from "axios";
// Models
import {
  TTasksListResponse,
  TTasksList,
  CreateTasksListDto,
  UpdateTasksListDto,
} from "@models/tasksList";
// Services
import { handleErrorMessage } from "@services/error";
import { TCreateTaskDto, TDeleteTaskDto } from "@models/task";

export const createTasksListReq = async (
  baseUrl: string,
  token: string,
  payload: CreateTasksListDto
) => {
  try {
    const response = await axios.post<TTasksList>(
      `${baseUrl}/tasklist/create`,
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

export const getAllTasksListByBoardReq = async (
  baseUrl: string,
  token: string,
  boardId: string
) => {
  try {
    const response = await axios.get<TTasksListResponse>(
      `${baseUrl}/tasklist/list/${boardId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const updateTasksListReq = async (
  baseUrl: string,
  token: string,
  tasksListId: string,
  payload: UpdateTasksListDto
) => {
  try {
    const response = await axios.put<TTasksList>(
      `${baseUrl}/tasklist/update/${tasksListId}`,
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

export const deleteTasksListReq = async (
  baseUrl: string,
  token: string,
  tasksListId: string
) => {
  try {
    await axios.delete(`${baseUrl}/tasklist/remove/${tasksListId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

//******** Removing or adding tasks to the list *******//

export const assignNewTaskReq = async (
  baseUrl: string,
  token: string,
  payload: TCreateTaskDto
) => {
  try {
    const response = await axios.put<TTasksList>(
      `${baseUrl}/tasklist/asssign/task`,
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

export const removeTaskReq = async (
  baseUrl: string,
  token: string,
  payload: TDeleteTaskDto
) => {
  try {
    const response = await axios.put<TTasksList>(
      `${baseUrl}/tasklist/remove/task`,
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
