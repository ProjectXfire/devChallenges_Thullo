import { createContext, useReducer, useState } from "react";
// Models
import { TBoard } from "@models/board";
import { TTasksList } from "@models/tasksList";
// Reducer
import { boardReducer } from "./BoardReducer";
import { TUser } from "@models/user";

export interface IBoardStates {
  boards: TBoard[];
  selectedBoard: TBoard;
  tasksListByBoard: TTasksList[];
  selectedUser: TUser | null;
}

interface IBoardProps {
  states: IBoardStates;
  setBoard: (board: TBoard) => void;
  setBoards: (boards: TBoard[]) => void;
  setSelectedBoard: (board: TBoard) => void;
  clearSelectedBoard: () => void;
  setSelectedUser: (user: TUser) => void;
  setTasksLists: (tasksLists: TTasksList[]) => void;
  setTasksList: (tasksList: TTasksList) => void;
  updateTasksList: (tasksList: TTasksList, index: number) => void;
  removeTasksList: (tasksListId: string) => void;
}

const boardInitValues: IBoardStates = {
  boards: [],
  selectedUser: null,
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
  // Set the selected board
  const setSelectedUser = (user: TUser) => {
    dispatch({ type: "selectedUser", payload: user });
  };
  const clearSelectedBoard = () => {
    dispatch({
      type: "clearSelectedBoard",
      payload: {
        _id: "",
        cover: "",
        isPublic: false,
        members: [],
        title: "",
        description: "",
        createdAt: "",
      },
    });
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

  return (
    <BoardContext.Provider
      value={{
        states,
        setBoard,
        setBoards,
        setSelectedBoard,
        clearSelectedBoard,
        setSelectedUser,
        setTasksLists,
        setTasksList,
        updateTasksList,
        removeTasksList,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
