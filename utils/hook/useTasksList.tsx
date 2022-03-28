import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// Providers
import { toast } from "react-toastify";
// Models
import { TBoard } from "@models/board";
import { TTasksList, TTasksListResponse } from "@models/tasksList";
// Services
import {
  createTasksListReq,
  updateTasksListReq,
} from "@services/app/tasksList";
import { updateTaskOnlyListReq } from "@services/app/task";
import { updateAllLabelsByTaskIdReq } from "@services/app/label";
import { updateAllCommentsByTaskIdReq } from "@services/app/comment";
import { sendMessage } from "@services/socket/handleSocket";
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
  const router = useRouter();

  //******** STATES ********//
  // Context
  const {
    states: { tasksListByBoard, selectedBoard },
    setTasksLists,
    setTasksList,
    updateTasksList,
  } = useContext(BoardContext);
  // Show or hide add tasks list menu
  const [showAddTasksListMenu, setShowAddTasksListMenu] = useState(false);
  // DnD
  const [isBrowser, setIsBrowser] = useState(false);

  //******** METHODS ********//

  // Add new tasks list
  const addNewTasksList = async (title: string) => {
    if (title) {
      try {
        const newTasksList = await createTasksListReq(null, {
          boardId: board._id,
          title,
          authBoardId: board._id,
        });
        setTasksList(newTasksList);
      } catch (error: any) {
        if (error.message.includes("401")) {
          toast.error("Action denied");
        } else {
          router.push({
            pathname: "/error",
            query: {
              errorMessage: error.message,
            },
          });
        }
      }
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

    // Create a new reference from the taskslist state
    const newTasksListByBoard: TTasksList[] = JSON.parse(
      JSON.stringify(tasksListByBoard)
    );
    // Create temp reference from action denied
    const tempTasksListByBoard: TTasksList[] = JSON.parse(
      JSON.stringify(tasksListByBoard)
    );
    // Get index from the source and destination column
    const startColumn = newTasksListByBoard.findIndex(
      (item) => item._id === source.droppableId
    );
    const finishColumn = newTasksListByBoard.findIndex(
      (item) => item._id === destination.droppableId
    );

    // Validate if the new position is in the same list
    if (startColumn === finishColumn) {
      // Initial state from action denied
      const initialStateTasksList = tempTasksListByBoard.find(
        (item) => item._id === destination.droppableId
      );
      // TasksList to be changed from move elements
      const tasksListSource = newTasksListByBoard.find(
        (item) => item._id === destination.droppableId
      );
      if (tasksListSource) {
        const taskToMove = tasksListSource.tasks[source.index];
        tasksListSource.tasks.splice(source.index, 1);
        tasksListSource.tasks.splice(destination.index, 0, taskToMove);
        const newTasksOrderIds = tasksListSource.tasks.map((item) => item._id);
        try {
          updateTasksList(tasksListSource, startColumn);
          await updateTasksListReq(null, destination.droppableId, {
            tasks: newTasksOrderIds,
            authBoardId: board._id,
          });
          sendMessage(selectedBoard._id);
          return;
        } catch (error: any) {
          if (error.message.includes("401")) {
            toast.error("Action denied");
            if (initialStateTasksList) {
              updateTasksList(initialStateTasksList, startColumn);
            }
          } else {
            router.push({
              pathname: "/error",
              query: {
                errorMessage: error.message,
              },
            });
          }
        }
        return;
      }
      return;
    }

    // The new position is in a different list
    // Initial state from action denied
    const tempTasksListSource = tempTasksListByBoard.find(
      (item) => item._id === source.droppableId
    );
    const tempTasksListDest = tempTasksListByBoard.find(
      (item) => item._id === destination.droppableId
    );

    // TasksList to be changed from move elements
    const tasksListSource = newTasksListByBoard.find(
      (item) => item._id === source.droppableId
    );
    const tasksListDest = newTasksListByBoard.find(
      (item) => item._id === destination.droppableId
    );
    if (tasksListSource && tasksListDest) {
      const taskToMove = tasksListSource.tasks[source.index];
      taskToMove.listId = destination.droppableId; // ---> Update listId in task in local
      const newLabelArray = taskToMove.labels.map((item) => {
        return {
          ...item,
          listId: destination.droppableId,
        };
      });
      taskToMove.labels = newLabelArray; // ---> Update listId to all labels in task
      tasksListSource.tasks.splice(source.index, 1);
      tasksListDest.tasks.splice(destination.index, 0, taskToMove);
      const newTasksOrderSourceIds = tasksListSource.tasks.map(
        (item) => item._id
      );
      const newTasksOrderDestinationIds = tasksListDest.tasks.map(
        (item) => item._id
      );
      // Update in local
      updateTasksList(tasksListSource, startColumn);
      updateTasksList(tasksListDest, finishColumn);
      // Update in database
      Promise.all([
        updateAllLabelsByTaskIdReq(null, draggableId, destination.droppableId),
        updateTasksListReq(null, source.droppableId, {
          tasks: newTasksOrderSourceIds,
          authBoardId: board._id,
        }),
        updateTasksListReq(null, destination.droppableId, {
          tasks: newTasksOrderDestinationIds,
          authBoardId: board._id,
        }),
        updateTaskOnlyListReq(null, draggableId, {
          listId: destination.droppableId,
          authBoardId: board._id,
        }),
        updateAllCommentsByTaskIdReq(null, draggableId, {
          listId: destination.droppableId,
        }),
      ])
        .then(() => sendMessage(selectedBoard._id))
        .catch((error) => {
          if (error.message.includes("401")) {
            toast.error("Action denied");
            // Update in local
            if (tempTasksListSource && tempTasksListDest) {
              updateTasksList(tempTasksListSource, startColumn);
              updateTasksList(tempTasksListDest, finishColumn);
            }
          } else {
            router.push({
              pathname: "/error",
              query: {
                errorMessage: error.message,
              },
            });
          }
        });
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

  // DND Library
  useEffect(() => {
    setIsBrowser(process.browser);
  }, []);

  return {
    isBrowser,
    tasksListByBoard,
    onDragEnd,
    addNewTasksList,
    addTasksListMenuRef,
    showAddTasksListMenu,
    setShowAddTasksListMenu,
  };
};
