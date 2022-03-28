import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// Providers
import { toast } from "react-toastify";
// Models
import { TUser } from "@models/user";
import { TComment } from "@models/comment";
import { TAttachment } from "@models/attachment";
// Services
import {
  updateTaskReq,
  uploadCoverReq,
  assignUserReq,
  removeUserReq,
  addTaskLabelReq,
  removeTaskLabelReq,
} from "@services/app/task";
import {
  createCommentReq,
  getAllCommentsByTaskIdReq,
  removeCommentReq,
} from "@services/app/comment";
import {
  createAttachmentReq,
  getAllAttachmentByTaskId,
  deleteAttachmentReq,
} from "@services/app/attachment";
// Context
import { BoardContext } from "@utils/context/board/BoardContext";
import { UserContext } from "@utils/context/user/UserContext";
import { TaskContext } from "@utils/context/Task/TaskContext";
// Utils
import { updateTasksListFromTask } from "@utils/updateTasksListFromTask";
import { uploadImageFile } from "@utils/uploadImageFile";
import { uploadFile } from "@utils/uploadFile";

export const useTask = () => {
  //******** VARIABLES ********//
  const boardMembersRef = useRef<HTMLDivElement>(null);
  const labelModalRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  //******** CONTEXT ********//
  // User
  const {
    states: { user },
  } = useContext(UserContext);
  // Board
  const {
    states: { tasksListByBoard, selectedBoard },
    setTasksLists,
  } = useContext(BoardContext);
  // Task
  const {
    states: { selectedTask, selectedTaskBelongToList },
    setSelectedTask,
    updateTask,
  } = useContext(TaskContext);

  //******** STATES ********//
  // Get all comments by taskId
  const [comments, setComments] = useState<TComment[]>([]);
  // Get all attachments by taskId
  const [attachments, setAttachments] = useState<TAttachment[]>([]);
  // Enable, disable input task title
  const [activeInputTaskTitle, setActiveInputTaskTitle] = useState(false);
  // Handle task title input value
  const [inputTaskTitle, setInputTaskTitle] = useState("");
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
  // Show or close labels modal
  const [showLabels, setShowLabels] = useState(false);
  // Handle input label
  const [labelData, setLabelData] = useState({
    value: "",
    color: "",
  });

  //******** METHODS ********//
  // Handle assign members menu
  const showHideTaskMembersMenu = () => {
    setShowTaskMembers((value) => !value);
  };

  // Update task description
  const updateTaskDescription = async (description: string) => {
    try {
      if (selectedTask) {
        const updatedTask = await updateTaskReq(null, selectedTask._id, {
          description,
          authBoardId: selectedBoard._id,
        });
        const newLists = updateTasksListFromTask(
          tasksListByBoard,
          selectedTask,
          updatedTask
        );
        setTasksLists(newLists);
        updateTask(updatedTask);
      }
    } catch (error: any) {
      if (error.message.includes("401")) {
        toast.error("Action denied");
        setTextareaValue("");
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

  const updateTaskTitle = async (taskTitle: string) => {
    try {
      if (selectedTask && taskTitle) {
        const updatedTask = await updateTaskReq(null, selectedTask._id, {
          title: taskTitle,
          authBoardId: selectedBoard._id,
        });
        const newLists = updateTasksListFromTask(
          tasksListByBoard,
          selectedTask,
          updatedTask
        );
        setTasksLists(newLists);
        updateTask(updatedTask);
      }
    } catch (error: any) {
      if (error.message.includes("401")) {
        toast.error("Action denied");
        setTextareaValue("");
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

  // Handle upload cover
  const updateTaskCover = async (e: ChangeEvent<HTMLInputElement>) => {
    uploadImageFile(e, (fileType, exceed, reader, formData) => {
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
        const updatedTask = await uploadCoverReq(
          null,
          taskId,
          payload,
          selectedBoard._id
        );
        const newLists = updateTasksListFromTask(
          tasksListByBoard,
          selectedTask,
          updatedTask
        );
        updateTask(updatedTask);
        setTasksLists(newLists);
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

  // Add new comment
  const addNewComment = async (comment: string) => {
    if (selectedTask) {
      try {
        const newComment = await createCommentReq(null, {
          comment,
          boardId: selectedTask.boardId,
          listId: selectedTask.listId,
          taskId: selectedTask._id,
        });
        setComments([...comments, newComment]);
      } catch (error: any) {
        router.push({
          pathname: "/error",
          query: {
            errorMessage: error.message,
          },
        });
      }
    }
  };

  // Remove comment
  const removeComment = async (commentId: string, createdBy: string) => {
    try {
      if (user._id === createdBy) {
        await removeCommentReq(null, commentId);
        const updatedComments = comments.filter(
          (comm) => comm._id !== commentId
        );
        if (selectedTask) {
          const updatedTask = { ...selectedTask };
          updatedTask.countComments = updatedTask.countComments - 1;
          const newLists = updateTasksListFromTask(
            tasksListByBoard,
            selectedTask,
            updatedTask
          );
          setTasksLists(newLists);
        }
        setComments(updatedComments);
      } else {
        toast.error("Only the owner can delete it");
      }
    } catch (error: any) {
      router.push({
        pathname: "/error",
        query: {
          errorMessage: error.message,
        },
      });
    }
  };

  // Assign member to task
  const assignMemberToTask = async () => {
    if (selectedTask && selectedItem) {
      try {
        const updatedTask = await assignUserReq(null, {
          userId: selectedItem,
          taskId: selectedTask._id,
          authBoardId: selectedBoard._id,
        });
        const newLists = updateTasksListFromTask(
          tasksListByBoard,
          selectedTask,
          updatedTask
        );
        updateTask(updatedTask);
        setTasksLists(newLists);
        setSelectedItem("");
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

  // Remove member from task
  const removeMemberFromTask = async (userId: string) => {
    if (selectedTask) {
      try {
        const updatedTask = await removeUserReq(null, {
          taskId: selectedTask._id,
          userId,
          authBoardId: selectedBoard._id,
        });
        const newLists = updateTasksListFromTask(
          tasksListByBoard,
          selectedTask,
          updatedTask
        );
        updateTask(updatedTask);
        setTasksLists(newLists);
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

  // Add new label
  const addNewLabel = async () => {
    if (selectedTask) {
      if (labelData.value && labelData.value.length < 16 && labelData.color) {
        alertRef.current ? (alertRef.current.innerText = "") : null;
        try {
          const updatedTask = await addTaskLabelReq(null, {
            taskId: selectedTask._id,
            boardId: selectedTask.boardId,
            listId: selectedTask.listId,
            color: labelData.color,
            title: labelData.value,
            authBoardId: selectedBoard._id,
          });
          const newLists = updateTasksListFromTask(
            tasksListByBoard,
            selectedTask,
            updatedTask
          );
          updateTask(updatedTask);
          setTasksLists(newLists);
          setLabelData({
            color: "",
            value: "",
          });
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
      } else {
        if (alertRef.current) {
          if (labelData.value.length > 15 && !labelData.color) {
            alertRef.current.innerText = `* Label limit 15 characters\n* Missing color`;
            return;
          }
          if (labelData.value.length === 0) {
            alertRef.current.innerText = `* Label is empty`;
            return;
          }
          if (labelData.value.length > 15) {
            alertRef.current.innerText = `* Label limit 15 characters`;
            return;
          }
          if (!labelData.color) {
            alertRef.current.innerText = `* Missing color`;
            return;
          }
        }
      }
    }
  };

  // Remove label
  const removeLabel = async (labelId: string) => {
    if (selectedTask) {
      try {
        const updatedTask = await removeTaskLabelReq(null, {
          labelId,
          taskId: selectedTask._id,
          authBoardId: selectedBoard._id,
        });
        const newLists = updateTasksListFromTask(
          tasksListByBoard,
          selectedTask,
          updatedTask
        );
        setTasksLists(newLists);
        updateTask(updatedTask);
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

  // Handle attachment
  const addAttachment = (e: ChangeEvent<HTMLInputElement>) => {
    uploadFile(e, 200000, async (exceed, reader, formData) => {
      if (exceed) {
        toast.error("The file must not exceed the 200kb");
        return;
      }
      if (reader && formData && selectedTask) {
        formData.append("taskId", selectedTask._id);
        formData.append("listId", selectedTask.listId);
        formData.append("boardId", selectedTask.boardId);
        try {
          const newAttachment = await createAttachmentReq(
            null,
            formData,
            selectedBoard._id
          );
          setAttachments([...attachments, newAttachment]);
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
    });
  };

  // Delete attachment
  const deleteAttachment = async (attachmentId: string, imageId: string) => {
    try {
      await deleteAttachmentReq(null, attachmentId, imageId, selectedBoard._id);
      const updateAttachemnts = attachments.filter(
        (item) => item._id !== attachmentId
      );
      if (selectedTask) {
        const updatedTask = { ...selectedTask };
        updatedTask.countAttachments = updatedTask.countAttachments - 1;
        const newLists = updateTasksListFromTask(
          tasksListByBoard,
          selectedTask,
          updatedTask
        );
        setTasksLists(newLists);
      }
      setAttachments(updateAttachemnts);
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

  // Fetch all comments by taskId
  useEffect(() => {
    if (selectedTask) {
      Promise.all([
        getAllCommentsByTaskIdReq(null, selectedTask._id),
        getAllAttachmentByTaskId(null, selectedTask._id),
      ])
        .then((result) => {
          setComments(result[0]);
          setAttachments(result[1]);
        })
        .catch((error) => router.push("/error"));
      setTextareaValue(selectedTask.description);
      setSearchedMembers(selectedBoard.members);
      setInputTaskTitle(selectedTask.title);
    }
  }, [selectedTask]);

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

  // Close labels modal on onClick event outside menu
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showLabels && !labelModalRef.current?.contains(e.target)) {
        setShowLabels(false);
        setLabelData({ color: "", value: "" });
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showLabels]);

  return {
    selectedTask,
    selectedTaskBelongToList,
    setSelectedTask,
    activeInputTaskTitle,
    setActiveInputTaskTitle,
    inputTaskTitle,
    setInputTaskTitle,
    updateTaskTitle,
    activeTextarea,
    setActiveTextarea,
    textareaValue,
    setTextareaValue,
    updateTaskDescription,
    updateTaskCover,
    addAttachment,
    showHideTaskMembersMenu,
    showTaskMembers,
    setShowTaskMembers,
    boardMembersRef,
    showBoardMembers,
    setShowBoardMembers,
    selectedItem,
    setSelectedItem,
    assignMemberToTask,
    removeMemberFromTask,
    searchedMembers,
    cleanSearchedMembers,
    onSearchedMembers,
    showLabels,
    labelModalRef,
    setShowLabels,
    labelData,
    setLabelData,
    addNewLabel,
    alertRef,
    removeLabel,
    user,
    addNewComment,
    removeComment,
    comments,
    attachments,
    deleteAttachment,
  };
};
