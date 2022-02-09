import axios from "axios";
// Models
import {
  TTasksListResponse,
  TTasksList,
  CreateTasksListDto,
  UpdateTasksListDto,
} from "@models/tasksList";
// Services
import apiReq from "@services/interceptors/apiThullo";
import { handleErrorMessage } from "@services/error";
import { TCreateTaskDto, TDeleteTaskDto } from "@models/task";

export const createTasksListReq = async (
  token: string | null,
  payload: CreateTasksListDto
) => {
  try {
    const response = await apiReq(token).post<TTasksList>(
      `/tasklist/create`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const getAllTasksListByBoardReq = async (
  token: string | null,
  boardId: string
) => {
  try {
    const response = await apiReq(token).get<TTasksListResponse>(
      `/tasklist/list/${boardId}`
    );
    return response.data.result;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const updateTasksListReq = async (
  token: string | null,
  tasksListId: string,
  payload: UpdateTasksListDto
) => {
  try {
    const response = await apiReq(token).put<TTasksList>(
      `/tasklist/update/${tasksListId}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const deleteTasksListReq = async (
  token: string | null,
  tasksListId: string
) => {
  try {
    await apiReq(token).delete(`/tasklist/remove/${tasksListId}`);
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

//******** Removing or adding tasks to the list *******//

export const assignNewTaskReq = async (
  token: string | null,
  payload: TCreateTaskDto
) => {
  try {
    const response = await apiReq(token).put<TTasksList>(
      `/tasklist/asssign/task`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const removeTaskReq = async (
  token: string | null,
  payload: TDeleteTaskDto
) => {
  try {
    const response = await apiReq(token).put<TTasksList>(
      `/tasklist/remove/task`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
