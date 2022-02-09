import { useContext, useEffect, useRef, useState } from "react";
// Services
import {
  updateTaskReq,
  uploadCoverReq,
  assignUserReq,
} from "@services/app/task";
// Utils
import { updateTasksListFromTask } from "@utils/updateTasksListFromTask";
// Context
import { BoardContext } from "@utils/context/board/BoardContext";

interface Props {
  baseUrl: string;
  token: string;
}

export const useTask = ({ baseUrl, token }: Props) => {
  //******** VARIABLES ********//
  const boardMembersRef = useRef<HTMLDivElement>(null);

  //******** CONTEXT ********//
  // Board
  const {
    states: {
      selectedTask,
      selectedTaskBelongToList,
      tasksListByBoard,
      selectedBoard,
    },
    setSelectedTask,
    updateTask,
    setTasksLists,
  } = useContext(BoardContext);

  //******** STATES ********//
  // Handle error on request
  const [taskError, setTaskError] = useState("");
  // Enable, disable textarea
  const [activeTextarea, setActiveTextarea] = useState(true);
  // Handle textarea value
  const [textareaValue, setTextareaValue] = useState("");
  // Show or close task members
  const [showTaskMembers, setShowTaskMembers] = useState(false);
  // Show or close board members
  const [showBoardMembers, setShowBoardMembers] = useState(false);
  // Change color on selected item
  const [selectedItem, setSelectedItem] = useState("");

  //******** METHODS ********//
  // Handle assign members menu
  const showHideTaskMembersMenu = () => {
    setShowTaskMembers((value) => !value);
  };

  // Update task description
  const updateTaskDescription = async (taskId: string, description: string) => {
    try {
      const updatedTask = await updateTaskReq(null, taskId, {
        description,
      });
      updateTask(updatedTask);
    } catch (error: any) {
      setTaskError(error.message);
    }
  };
  // Upload or update cover
  const uploadCoverTask = async (taskId: string, payload: FormData) => {
    if (selectedTask) {
      try {
        const updatedTask = await uploadCoverReq(null, taskId, payload);
        const newLists = updateTasksListFromTask(
          tasksListByBoard,
          selectedTask,
          updatedTask
        );
        updateTask(updatedTask);
        setTasksLists(newLists);
      } catch (error: any) {
        setTaskError(error.message);
      }
    }
  };

  // Assign member to task
  const assignMemberToTask = async () => {
    if (selectedTask && selectedItem) {
      try {
        const updatedTask = await assignUserReq(null, {
          userId: selectedItem,
          taskId: selectedTask._id,
        });
        updateTask(updatedTask);
        setSelectedItem("");
      } catch (error: any) {
        setTaskError(error.message);
      }
    }
  };

  //******** EFFECTS ********//
  // Load task description on open edit modal
  useEffect(() => {
    if (selectedTask) {
      setTextareaValue(selectedTask.description);
    }
  }, [selectedTask?.description]);

  // Close board members list on onClick event outside menu
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showBoardMembers && !boardMembersRef.current?.contains(e.target)) {
        setShowBoardMembers(false);
        setSelectedItem("");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showBoardMembers]);

  return {
    taskError,
    selectedBoard,
    selectedTask,
    selectedTaskBelongToList,
    setSelectedTask,
    activeTextarea,
    setActiveTextarea,
    textareaValue,
    setTextareaValue,
    updateTaskDescription,
    uploadCoverTask,
    showHideTaskMembersMenu,
    showTaskMembers,
    setShowTaskMembers,
    boardMembersRef,
    showBoardMembers,
    setShowBoardMembers,
    selectedItem,
    setSelectedItem,
    assignMemberToTask,
  };
};
