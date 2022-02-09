// Models
import { TBoard } from "@models/board";
import { TTask } from "@models/task";
import { TTasksList } from "@models/tasksList";
// States
import { IBoardStates } from "./BoardContext";

type BoardAction =
  | { type: "addBoard"; payload: TBoard }
  | { type: "allBoards"; payload: TBoard[] }
  | { type: "selectedBoard"; payload: TBoard }
  | { type: "allTasksList"; payload: TTasksList[] }
  | { type: "addTasksList"; payload: TTasksList }
  | {
      type: "updateTasksList";
      payload: {
        index: number;
        tasksList: TTasksList;
      };
    }
  | { type: "removeTasksList"; payload: string }
  | {
      type: "selectedTask";
      payload: {
        task: TTask | null;
        tasksList: string;
      };
    }
  | { type: "updateTask"; payload: TTask };

export const boardReducer = (
  states: IBoardStates,
  action: BoardAction
): IBoardStates => {
  switch (action.type) {
    case "allBoards":
      return {
        ...states,
        boards: action.payload,
      };
    case "selectedBoard":
      return {
        ...states,
        selectedBoard: action.payload,
      };
    case "addBoard":
      return {
        ...states,
        boards: [...states.boards, action.payload],
      };
    case "allTasksList":
      return {
        ...states,
        tasksListByBoard: action.payload,
      };
    case "addTasksList":
      return {
        ...states,
        tasksListByBoard: [...states.tasksListByBoard, action.payload],
      };
    case "updateTasksList":
      return {
        ...states,
        ...states.tasksListByBoard.splice(
          action.payload.index,
          1,
          action.payload.tasksList
        ),
      };
    case "removeTasksList":
      return {
        ...states,
        tasksListByBoard: states.tasksListByBoard.filter(
          (item) => item._id !== action.payload
        ),
      };
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
