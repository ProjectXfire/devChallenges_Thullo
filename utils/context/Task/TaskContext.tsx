import { createContext, useReducer, useState } from "react";
// Models
import { TTask } from "@models/task";
// Reducer
import { taskReducer } from "./TaskReducer";

export interface ITaskStates {
  selectedTask: TTask | null;
  selectedTaskBelongToList: string;
}

interface ITaskProps {
  states: ITaskStates;
  setSelectedTask: (task: TTask | null, tasksListTitle: string) => void;
  updateTask: (task: TTask) => void;
}

const taskInitValues: ITaskStates = {
  selectedTask: null,
  selectedTaskBelongToList: "",
};

export const TaskContext = createContext({} as ITaskProps);

export const TaskProvider: React.FC = ({ children }) => {
  //******** STATES ********//
  const [states, dispatch] = useReducer(taskReducer, taskInitValues);

  //******** METHODS ********//
  //******** TASK ********//
  // Set selected task
  const setSelectedTask = (task: TTask | null, tasksList: string) => {
    dispatch({ type: "selectedTask", payload: { task, tasksList } });
  };
  const updateTask = (task: TTask) => {
    dispatch({ type: "updateTask", payload: task });
  };

  return (
    <TaskContext.Provider
      value={{
        states,
        setSelectedTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
