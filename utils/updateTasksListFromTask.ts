import { TTask } from "@models/task";
import { TTasksList } from "@models/tasksList";

export const updateTasksListFromTask = (
  tasksList: TTasksList[],
  task: TTask,
  updatedTask: TTask
): TTasksList[] => {
  const newLists = [...tasksList];
  const getlistIndex = tasksList.findIndex((item) => item._id === task.listId);
  const newTasks = [...newLists[getlistIndex].tasks];
  const getTaskIndex = newTasks.findIndex((item) => item._id === task._id);
  newTasks[getTaskIndex] = updatedTask;
  newLists[getlistIndex] = { ...newLists[getlistIndex], tasks: newTasks };
  return newLists;
};
