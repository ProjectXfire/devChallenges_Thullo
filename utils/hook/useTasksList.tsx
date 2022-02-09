import { useContext, useEffect, useRef, useState } from "react";
// Models
import { TBoard } from "@models/board";
import { TTasksList } from "@models/tasksList";
// Services
import {
  createTasksListReq,
  deleteTasksListReq,
  updateTasksListReq,
  assignNewTaskReq,
  removeTaskReq,
} from "@services/app/tasksList";
import { updateTaskReq } from "@services/app/task";
// Context
import { BoardContext } from "@utils/context/board/BoardContext";
import { DropResult } from "react-beautiful-dnd";

interface Props {
  board: TBoard;
  tasksList: TTasksList[];
}

export const useTasksList = ({ board, tasksList }: Props) => {
  //******** VARIABLES ********//
  const addTasksListMenuRef = useRef<HTMLDivElement>(null);

  //******** STATES ********//
  // Context
  const {
    states: { tasksListByBoard },
    setTasksLists,
    setTasksList,
    removeTasksList,
    updateTasksList,
  } = useContext(BoardContext);
  // Show or hide add tasks list menu
  const [showAddTasksListMenu, setShowAddTasksListMenu] = useState(false);

  const [isBrowser, setIsBrowser] = useState(false);

  //******** METHODS ********//
  // Handle error on request
  const [tasksListError, setTasksListError] = useState("");

  // Add new tasks list
  const addNewTasksList = async (title: string) => {
    if (title) {
      try {
        const newTasksList = await createTasksListReq(null, {
          boardId: board._id,
          title,
        });
        setTasksList(newTasksList);
      } catch (error: any) {
        setTasksListError(error.message);
      }
    }
  };
  // Update tasks list
  const updateTasksListTitle = async (
    tasksListId: string,
    title: string,
    index: number
  ) => {
    try {
      const tasksList = await updateTasksListReq(null, tasksListId, {
        title,
      });
      updateTasksList(tasksList, index);
    } catch (error: any) {
      setTasksListError(error.message);
    }
  };
  // Delete tasks list
  const deleteTasksList = async (tasksListId: string) => {
    try {
      await deleteTasksListReq(null, tasksListId);
      removeTasksList(tasksListId);
    } catch (error: any) {
      setTasksListError(error.message);
    }
  };
  // Add new task
  const addNewTask = async (
    tasksListId: string,
    boardId: string,
    title: string,
    index: number
  ) => {
    if (title) {
      try {
        const tasksList = await assignNewTaskReq(null, {
          title,
          listId: tasksListId,
          boardId,
        });
        updateTasksList(tasksList, index);
      } catch (error: any) {
        setTasksListError(error.message);
      }
    }
  };
  // Delete task
  const deleteTask = async (taskId: string, listId: string, index: number) => {
    try {
      const tasksList = await removeTaskReq(null, {
        listId,
        taskId,
      });
      updateTasksList(tasksList, index);
    } catch (error: any) {
      setTasksListError(error.message);
    }
  };

  // On drag end - When change a task position
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    // Validate if exist destination
    if (!destination) {
      return;
    }
    // Validate if the new position is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Get index from the source and destination column
    const startColumn = tasksListByBoard.findIndex(
      (item) => item._id === source.droppableId
    );
    const finishColumn = tasksListByBoard.findIndex(
      (item) => item._id === destination.droppableId
    );
    // Validate if the new position is in the same list
    if (startColumn === finishColumn) {
      const tasksListSource = tasksListByBoard.find(
        (item) => item._id === destination.droppableId
      );
      if (tasksListSource) {
        const taskToMove = tasksListSource.tasks[source.index];
        tasksListSource.tasks.splice(source.index, 1);
        tasksListSource.tasks.splice(destination.index, 0, taskToMove);
        const newTasksOrderIds = tasksListSource.tasks.map((item) => item._id);
        updateTasksList(tasksListSource, startColumn);
        try {
          await updateTasksListReq(null, destination.droppableId, {
            tasks: newTasksOrderIds,
          });
          return;
        } catch (error: any) {
          setTasksListError(error.message);
        }
        return;
      }
      return;
    }
    // The new position is in a different list
    const tasksListSource = tasksListByBoard.find(
      (item) => item._id === source.droppableId
    );
    const tasksListDest = tasksListByBoard.find(
      (item) => item._id === destination.droppableId
    );
    if (tasksListSource && tasksListDest) {
      const taskToMove = tasksListSource.tasks[source.index];
      tasksListSource.tasks.splice(source.index, 1);
      tasksListDest.tasks.splice(destination.index, 0, taskToMove);
      const newTasksOrderSourceIds = tasksListSource.tasks.map(
        (item) => item._id
      );
      const newTasksOrderDestinationIds = tasksListDest.tasks.map(
        (item) => item._id
      );
      updateTasksList(tasksListSource, startColumn);
      const taskIndex = tasksListDest.tasks.findIndex(
        (task) => task._id === draggableId
      );
      tasksListDest.tasks[taskIndex].listId = destination.droppableId;
      updateTasksList(tasksListDest, finishColumn);
      try {
        await updateTasksListReq(null, source.droppableId, {
          tasks: newTasksOrderSourceIds,
        });
        await updateTasksListReq(null, destination.droppableId, {
          tasks: newTasksOrderDestinationIds,
        });
        await updateTaskReq(null, draggableId, {
          listId: destination.droppableId,
        });
        return;
      } catch (error: any) {
        setTasksListError(error.message);
      }
    }
  };

  //******** EFFECTS ********//
  // Set the board selected, set its tasks list and tasks
  useEffect(() => {
    setTasksLists(tasksList);
  }, []);
  // Close add tasks list on onClick event outside menu
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showAddTasksListMenu &&
        !addTasksListMenuRef.current?.contains(e.target)
      ) {
        setShowAddTasksListMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showAddTasksListMenu]);

  useEffect(() => {
    setIsBrowser(process.browser);
  }, []);

  return {
    isBrowser,
    tasksListError,
    tasksListByBoard,
    onDragEnd,
    addNewTasksList,
    addTasksListMenuRef,
    showAddTasksListMenu,
    setShowAddTasksListMenu,
    updateTasksListTitle,
    deleteTasksList,
    addNewTask,
    deleteTask,
  };
};
