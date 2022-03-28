import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// Providers
import { toast } from "react-toastify";
// Models
import { TTasksList } from "@models/tasksList";
// Services
import {
  assignNewTaskReq,
  deleteTasksListReq,
  removeTaskReq,
  updateTasksListReq,
} from "@services/app/tasksList";
import { BoardContext } from "@utils/context/board/BoardContext";

interface Props {
  tasksList: TTasksList;
}

export const useTaskList = ({ tasksList }: Props) => {
  //******** VARIABLES ********//
  const tasksListMenuRef = useRef<HTMLDivElement>(null);
  const tastsListTitleMenuRef = useRef<HTMLDivElement>(null);
  const newTaskRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //******** CONTEXT ********//
  // Context
  const {
    states: { selectedBoard },
    removeTasksList,
    updateTasksList,
  } = useContext(BoardContext);

  //******** STATES ********//
  // Show or hide tasks list menu
  const [showTasksListMenu, setShowTasksListMenu] = useState(false);
  // Show or hide change title input
  const [showTasksListInput, setShowTasksListInput] = useState(false);
  // Show or hide new task menu
  const [showTaskInput, setShowTaskInput] = useState(false);
  // Handle input title value from rename tasks list
  const [inputTasksListValue, setInputTasksListValue] = useState(
    tasksList.title
  );
  // Handle input title value from new task
  const [inputTaskValue, setInputTaskValue] = useState("");
  // Handle delete modal
  const [showDeleteTasksListModal, setShowDeleteTasksListModal] =
    useState(false);

  //******** METHODS ********//

  // Update tasks list title
  const updateTasksListTitle = async (
    tasksListId: string,
    title: string,
    index: number
  ) => {
    try {
      const updatedTasksList = await updateTasksListReq(null, tasksListId, {
        title,
        authBoardId: selectedBoard._id,
      });
      updateTasksList(updatedTasksList, index);
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
  };
  // Delete tasks list
  const deleteTasksList = async (tasksListId: string) => {
    try {
      await deleteTasksListReq(null, tasksListId, selectedBoard._id);
      removeTasksList(tasksListId);
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
          authBoardId: selectedBoard._id,
        });
        updateTasksList(tasksList, index);
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
  // Delete task
  const deleteTask = async (taskId: string, listId: string, index: number) => {
    try {
      const tasksList = await removeTaskReq(null, {
        listId,
        taskId,
        authBoardId: selectedBoard._id,
      });
      updateTasksList(tasksList, index);
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
  };

  //******** EFFECTS ********//

  // Close tasks list menu on onClick event outside menu
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showTasksListMenu && !tasksListMenuRef.current?.contains(e.target)) {
        setShowTasksListMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showTasksListMenu]);
  // Close tasks list menu on onClick event outside menu
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showTasksListInput &&
        !tastsListTitleMenuRef.current?.contains(e.target)
      ) {
        setShowTasksListInput(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showTasksListInput]);
  // Close task menu on onClick event outside menu
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showTaskInput && !newTaskRef.current?.contains(e.target)) {
        setShowTaskInput(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showTaskInput]);

  return {
    tasksListMenuRef,
    tastsListTitleMenuRef,
    newTaskRef,
    showTasksListMenu,
    setShowTasksListMenu,
    showTasksListInput,
    setShowTasksListInput,
    showDeleteTasksListModal,
    setShowDeleteTasksListModal,
    inputTasksListValue,
    setInputTasksListValue,
    showTaskInput,
    setShowTaskInput,
    inputTaskValue,
    setInputTaskValue,
    updateTasksListTitle,
    deleteTasksList,
    addNewTask,
    deleteTask,
  };
};
