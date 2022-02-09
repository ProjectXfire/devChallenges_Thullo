import { createContext, useReducer, useState } from "react";
// Models
import { TBoard } from "@models/board";
import { TTasksList } from "@models/tasksList";
import { TTask } from "@models/task";
// Reducer
import { boardReducer } from "./BoardReducer";

export interface IBoardStates {
  boards: TBoard[];
  selectedBoard: TBoard;
  tasksListByBoard: TTasksList[];
  selectedTask: TTask | null;
  selectedTaskBelongToList: string;
}

interface IBoardProps {
  states: IBoardStates;
  setBoard: (board: TBoard) => void;
  setBoards: (boards: TBoard[]) => void;
  setSelectedBoard: (board: TBoard) => void;
  setTasksLists: (tasksLists: TTasksList[]) => void;
  setTasksList: (tasksList: TTasksList) => void;
  updateTasksList: (tasksList: TTasksList, index: number) => void;
  removeTasksList: (tasksListId: string) => void;
  setSelectedTask: (task: TTask | null, tasksList: string) => void;
  updateTask: (task: TTask) => void;
}

const boardInitValues: IBoardStates = {
  boards: [],
  tasksListByBoard: [],
  selectedBoard: {
    _id: "",
    cover: "",
    isPublic: false,
    members: [],
    title: "",
    description: "",
    createdAt: "",
  },
  selectedTask: null,
  selectedTaskBelongToList: "",
};

export const BoardContext = createContext({} as IBoardProps);

export const BoardProvider: React.FC = ({ children }) => {
  //******** STATES ********//
  const [states, dispatch] = useReducer(boardReducer, boardInitValues);

  //******** METHODS ********//
  //******** BOARD ********//
  // Add a new board to the array
  const setBoard = (board: TBoard) => {
    dispatch({ type: "addBoard", payload: board });
  };
  // Get all the boards
  const setBoards = (boards: TBoard[]) => {
    dispatch({ type: "allBoards", payload: boards });
  };
  // Set the selected board
  const setSelectedBoard = (board: TBoard) => {
    dispatch({ type: "selectedBoard", payload: board });
  };
  //******** TASKS LIST ********//
  // Get all tasks list by board
  const setTasksLists = (tasksLists: TTasksList[]) => {
    dispatch({ type: "allTasksList", payload: tasksLists });
  };
  // Add a new board to the array
  const setTasksList = (tasksList: TTasksList) => {
    dispatch({ type: "addTasksList", payload: tasksList });
  };
  // Update tasks list
  const updateTasksList = (tasksList: TTasksList, index: number) => {
    dispatch({ type: "updateTasksList", payload: { index, tasksList } });
  };
  // Remove tasks list
  const removeTasksList = (tasksListId: string) => {
    dispatch({ type: "removeTasksList", payload: tasksListId });
  };
  //******** TASK ********//
  // Set selected task
  const setSelectedTask = (task: TTask | null, tasksList: string) => {
    dispatch({ type: "selectedTask", payload: { task, tasksList } });
  };
  const updateTask = (task: TTask) => {
    dispatch({ type: "updateTask", payload: task });
  };

  return (
    <BoardContext.Provider
      value={{
        states,
        setBoard,
        setBoards,
        setSelectedBoard,
        setTasksLists,
        setTasksList,
        updateTasksList,
        removeTasksList,
        setSelectedTask,
        updateTask,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
