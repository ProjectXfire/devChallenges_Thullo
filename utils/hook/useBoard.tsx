import { useContext, useEffect, useRef, useState } from "react";
// Models
import { TBoard } from "@models/board";
import { TUser } from "@models/user";
import { TTasksList } from "@models/tasksList";
// Services
import {
  updateBoardReq,
  removeMemberReq,
  addMemberReq,
} from "@services/app/board";
import { createTasksListReq } from "@services/app/tasksList";
import { searchUsersReq } from "@services/app/user";
// Context
import { BoardContext } from "@utils/context/board/BoardContext";
import { UserContext } from "@utils/context/user/UserContext";

interface Props {
  board: TBoard;
  user: TUser;
  baseUrl: string;
  token: string;
  tasksList: TTasksList[];
}

export const useBoard = ({ baseUrl, token, user, board, tasksList }: Props) => {
  //******** VARIABLES ********//
  const isPublicMenuRef = useRef<HTMLDivElement>(null);
  const addMemberRef = useRef<HTMLDivElement>(null);
  const usersListRef = useRef<HTMLDivElement>(null);

  //******** STATES ********//
  // Context
  const {
    states: { selectedBoard },
    setSelectedBoard,
  } = useContext(BoardContext);
  const { setUser } = useContext(UserContext);
  // Handle error on request
  const [boardError, setBoardError] = useState("");
  // Show isPublic menu
  const [showIsPublicMenu, setShowIsPublicMenu] = useState(false);
  // Show add member menu
  const [showAddMemberMenu, setShowAddMemberMenu] = useState(false);
  // Sideboard
  const [openSideBoard, setOpenSideBoard] = useState(false);
  // Users list
  const [showUsersList, setShowUsersList] = useState(false);
  // Set users searched
  const [searchedUsers, setSearchedUsers] = useState<TUser[]>([]);

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
    title: string | null = null,
    description: string | null = null
  ) => {
    setBoardError("");
    try {
      const payload = {
        title: title || selectedBoard.title,
        isPublic: isPublic !== null ? isPublic : selectedBoard.isPublic,
        description: description || selectedBoard.description,
      };
      const updatedBoard = await updateBoardReq(
        baseUrl,
        token,
        board._id,
        payload
      );
      setSelectedBoard(updatedBoard);
    } catch (error: any) {
      setBoardError(error.message);
    }
  };
  // Handle open and close sideboard
  const handleSideBoard = () => {
    setOpenSideBoard(!openSideBoard);
  };
  // Remove member
  const onRemoveMember = async (userId: string) => {
    setBoardError("");
    try {
      const updatedBoard = await removeMemberReq(
        baseUrl,
        token,
        board._id,
        userId
      );
      setSelectedBoard(updatedBoard);
    } catch (error: any) {
      setBoardError(error.message);
    }
  };
  // Search users
  const searchUsers = async (searchValue: string) => {
    setBoardError("");
    try {
      if (searchValue) {
        const users = await searchUsersReq(baseUrl, token, searchValue);
        setSearchedUsers(users);
      }
    } catch (error: any) {
      setBoardError(error.message);
    }
  };
  // Add user to board
  const addUserToBoard = async (userId: string) => {
    try {
      const updatedBoard = await addMemberReq(
        baseUrl,
        token,
        board._id,
        userId
      );
      setSelectedBoard(updatedBoard);
    } catch (error: any) {
      setBoardError(error.message);
    }
  };

  //******** EFFECTS ********//
  // Set the board selected, set its tasks list and tasks
  useEffect(() => {
    setSelectedBoard(board);
    setUser(user);
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
    boardError,
    selectedBoard,
    handleIsPublicMenu,
    isPublicMenuRef,
    showIsPublicMenu,
    updateBoard,
    handleSideBoard,
    openSideBoard,
    setOpenSideBoard,
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
  };
};
