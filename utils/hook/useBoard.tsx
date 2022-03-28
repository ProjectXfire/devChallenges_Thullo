import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// Providers
import { toast } from "react-toastify";
// Models
import { TBoard } from "@models/board";
import { TUser } from "@models/user";
// Services
import {
  updateBoardReq,
  removeMemberReq,
  addMemberReq,
} from "@services/app/board";
import { searchUsersReq } from "@services/app/user";
// Context
import { BoardContext } from "@utils/context/board/BoardContext";
import { UserContext } from "@utils/context/user/UserContext";
import {
  disconnectSocket,
  initiateSocket,
  subscribeToChat,
} from "@services/socket/handleSocket";
import { TTasksList } from "@models/tasksList";

interface Props {
  board: TBoard;
  user: TUser;
}

export const useBoard = ({ user, board }: Props) => {
  //******** VARIABLES ********//
  const isPublicMenuRef = useRef<HTMLDivElement>(null);
  const addMemberRef = useRef<HTMLDivElement>(null);
  const usersListRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //******** STATES ********//
  // Context
  const {
    states: { selectedBoard, tasksListByBoard },
    setSelectedBoard,
    clearSelectedBoard,
    setTasksLists,
  } = useContext(BoardContext);
  const { setUser, clearUser } = useContext(UserContext);
  // Handle session
  const [sessionExpired, setSessionExpired] = useState(false);
  // Show isPublic menu
  const [showIsPublicMenu, setShowIsPublicMenu] = useState(false);
  // Show add member menu
  const [showAddMemberMenu, setShowAddMemberMenu] = useState(false);
  // Sideboard
  const [openSideBoard, setOpenSideBoard] = useState(false);
  // Handle text area value on edit board
  const [textareaValue, setTextareaValue] = useState("");
  // Users list
  const [showUsersList, setShowUsersList] = useState(false);
  // Set users searched
  const [searchedUsers, setSearchedUsers] = useState<TUser[]>([]);
  // Show permissions modal
  const [showPermissions, setshowPermissions] = useState(false);

  //******** METHODS ********//
  // Handle open and close IsPublic menu
  const handleIsPublicMenu = () => {
    setShowIsPublicMenu(!showIsPublicMenu);
  };
  // Handle open and close AddMember menu
  const handleAddMemberMenu = () => {
    setShowAddMemberMenu(!showAddMemberMenu);
  };
  // Handle open and close users list
  const handleAUserList = () => {
    setShowUsersList(!showUsersList);
  };
  // Handle on update isPublic
  const updateBoard = async (
    isPublic: boolean | null = null,
    title: string | null = null
  ) => {
    try {
      const payload = {
        title: title || selectedBoard.title,
        isPublic: isPublic !== null ? isPublic : selectedBoard.isPublic,
        description: textareaValue,
        authBoardId: board._id,
      };
      const updatedBoard = await updateBoardReq(null, board._id, payload);
      setSelectedBoard(updatedBoard);
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
  // Handle open and close sideboard
  const handleSideBoard = () => {
    setOpenSideBoard(!openSideBoard);
  };
  // Search users
  const searchUsers = async (searchValue: string) => {
    try {
      if (searchValue) {
        const users = await searchUsersReq(null, searchValue);
        setSearchedUsers(users);
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
  // Add user to board
  const addUserToBoard = async (userId: string) => {
    try {
      if (userId) {
        const updatedBoard = await addMemberReq(null, board._id, userId);
        setSelectedBoard(updatedBoard);
      }
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
  // Remove member
  const onRemoveMember = async (userId: string) => {
    try {
      const updatedBoard = await removeMemberReq(null, board._id, userId);
      setSelectedBoard(updatedBoard);
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
  // Connect and disconnect to socket to handle task
  useEffect(() => {
    if (selectedBoard._id.length > 0) {
      initiateSocket(selectedBoard._id);
      subscribeToChat((err: any, data: TTasksList[]) => {
        if (err) return;
        setTasksLists(data);
      });
    }
    return () => {
      disconnectSocket();
    };
  }, [tasksListByBoard]);
  // Clear selected board
  useEffect(() => {
    return () => {
      clearSelectedBoard();
    };
  }, []);

  // Set the board selected, set its tasks list and tasks
  useEffect(() => {
    setSelectedBoard(board);
    setUser(user);
    const currentCookie = document.cookie;
    const time = setInterval(() => {
      if (currentCookie !== document.cookie) {
        clearInterval(time);
        clearUser();
        setSessionExpired(true);
      }
    }, 1000);
    return () => {
      clearInterval(time);
    };
  }, []);
  // Close isPublicMenu on onClick event outside menu
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showIsPublicMenu && !isPublicMenuRef.current?.contains(e.target)) {
        setShowIsPublicMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showIsPublicMenu]);
  // Close add member menu on onClick event outside menu
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showAddMemberMenu && !addMemberRef.current?.contains(e.target)) {
        setShowAddMemberMenu(false);
        setSearchedUsers([]);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showAddMemberMenu]);
  // Close users list on onClick event outside menu
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showUsersList && !usersListRef.current?.contains(e.target)) {
        setShowUsersList(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showUsersList]);

  return {
    selectedBoard,
    handleIsPublicMenu,
    isPublicMenuRef,
    showIsPublicMenu,
    updateBoard,
    handleSideBoard,
    openSideBoard,
    setOpenSideBoard,
    textareaValue,
    setTextareaValue,
    onRemoveMember,
    showAddMemberMenu,
    handleAddMemberMenu,
    addMemberRef,
    searchedUsers,
    searchUsers,
    addUserToBoard,
    handleAUserList,
    showUsersList,
    usersListRef,
    showPermissions,
    setshowPermissions,
    sessionExpired,
    setSessionExpired,
  };
};
