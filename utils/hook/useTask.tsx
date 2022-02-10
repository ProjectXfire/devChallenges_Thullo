import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
// Providers
import { toast } from "react-toastify";
// Models
import { TUser } from "@models/user";
// Services
import {
  updateTaskReq,
  uploadCoverReq,
  assignUserReq,
  removeUserReq,
} from "@services/app/task";
// Utils
import { updateTasksListFromTask } from "@utils/updateTasksListFromTask";
import { uploadFile } from "@utils/uploadFile";
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
  // Temp searched members
  const [searchedMembers, setSearchedMembers] = useState<TUser[]>([]);

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

  // Handle upload cover
  const updateTaskCover = async (e: ChangeEvent<HTMLInputElement>) => {
    uploadFile(e, (fileType, exceed, reader, formData) => {
      if (fileType) {
        toast.error("The file must be an image");
        return;
      }
      if (exceed) {
        toast.error("The file must not exceed the 100kb");
        return;
      }
      if (reader && formData && selectedTask) {
        formData.append("coverId", selectedTask.coverId);
        uploadCoverTask(selectedTask._id, formData);
      }
    });
  };
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
  const assignMemberFromTask = async () => {
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

  // Remove member from task
  const removeMemberFromTask = async (userId: string) => {
    if (selectedTask) {
      try {
        const updatedTask = await removeUserReq(null, {
          taskId: selectedTask._id,
          userId,
        });
        updateTask(updatedTask);
      } catch (error: any) {
        setTaskError(error.message);
      }
    }
  };

  // Search members from board list
  const onSearchedMembers = (searchedValue: string) => {
    if (searchedValue) {
      const searchedMembers = selectedBoard.members.filter((user) =>
        user.completeName.includes(searchedValue.toLowerCase())
      );
      setSearchedMembers(searchedMembers);
    } else {
      setSearchedMembers(selectedBoard.members);
    }
  };
  // Clean searched members
  const cleanSearchedMembers = () => {
    setSearchedMembers(selectedBoard.members);
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

  // Load members in searched state
  useEffect(() => {
    setSearchedMembers(selectedBoard.members);
  }, [selectedBoard]);

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
    updateTaskCover,
    showHideTaskMembersMenu,
    showTaskMembers,
    setShowTaskMembers,
    boardMembersRef,
    showBoardMembers,
    setShowBoardMembers,
    selectedItem,
    setSelectedItem,
    assignMemberFromTask,
    removeMemberFromTask,
    searchedMembers,
    cleanSearchedMembers,
    onSearchedMembers,
  };
};
