// Models
import { TTask } from "@models/task";
// States
import { ITaskStates } from "./TaskContext";

type BoardAction =
  | {
      type: "selectedTask";
      payload: {
        task: TTask | null;
        tasksList: string;
      };
    }
  | { type: "updateTask"; payload: TTask };

export const taskReducer = (
  states: ITaskStates,
  action: BoardAction
): ITaskStates => {
  switch (action.type) {
    case "selectedTask":
      return {
        ...states,
        selectedTask: action.payload.task,
        selectedTaskBelongToList: action.payload.tasksList,
      };
    case "updateTask":
      return {
        ...states,
        selectedTask: action.payload,
      };
    default:
      return states;
  }
};
