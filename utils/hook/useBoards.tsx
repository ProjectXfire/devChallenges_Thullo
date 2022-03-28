import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// Providers
import { toast } from "react-toastify";
// Models
import { TBoardResponse } from "@models/board";
import { TUser } from "@models/user";
// Services
import { findUserInBoardReq, getBoardsReq } from "@services/app/board";
// User context
import { UserContext } from "@utils/context/user/UserContext";
import { BoardContext } from "@utils/context/board/BoardContext";
// Utils
import { DOCUMENTS_PER_PAGE } from "@utils/variables";

interface Props {
  dataUser: TUser;
  boardResponse: TBoardResponse;
}

export const useBoards = ({ boardResponse, dataUser }: Props) => {
  //******** VARIABLES ********//
  const router = useRouter();

  //******** CONTEXTS ********//
  // User
  const { setUser, clearUser } = useContext(UserContext);
  const {
    setBoards,
    states: { boards },
  } = useContext(BoardContext);

  //******** STATES ********//
  // Modal
  const [showModal, setShowModal] = useState(false);
  // Handle session
  const [sessionExpired, setSessionExpired] = useState(false);
  // Search board value
  const [searchBoardValue, setSearchBoardValue] = useState("");
  // Handle pages
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(boardResponse.total);

  //******** METHODS ********//
  // Verify if you have been added to the board selected
  const validateAccessToBoard = async (boardId: string, isPublic: boolean) => {
    try {
      const isAMember = await findUserInBoardReq(null, boardId);
      if (isAMember || isPublic) {
        router.push(`/${boardId}`);
        return;
      }
      toast.error("This board is private, please contact the admin.");
    } catch (error: any) {
      router.push({
        pathname: "/error",
        query: {
          errorMessage: error.message,
        },
      });
    }
  };
  // set search board value
  const handleSearchBoardValue = async (value: string) => {
    setSearchBoardValue(value);
    if (!value) {
      try {
        const boardResponse = await getBoardsReq(null, 1, DOCUMENTS_PER_PAGE);
        setCurrentPage(1);
        setBoards(boardResponse.result);
        setTotalData(boardResponse.total);
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

  // Search boards
  const searchBoards = async () => {
    if (searchBoardValue) {
      try {
        const boardResponse = await getBoardsReq(
          null,
          1,
          DOCUMENTS_PER_PAGE,
          searchBoardValue
        );
        setCurrentPage(1);
        setBoards(boardResponse.result);
        setTotalData(boardResponse.total);
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
  // Handle pagination
  const handleNextPage = async (nextPage: number) => {
    try {
      let boardResponse: TBoardResponse;
      if (searchBoardValue) {
        boardResponse = await getBoardsReq(
          null,
          nextPage,
          DOCUMENTS_PER_PAGE,
          searchBoardValue
        );
      } else {
        boardResponse = await getBoardsReq(null, nextPage, DOCUMENTS_PER_PAGE);
      }
      setCurrentPage(nextPage);
      setBoards(boardResponse.result);
    } catch (error: any) {
      router.push({
        pathname: "/error",
        query: {
          errorMessage: error.message,
        },
      });
    }
  };

  //******** EFFECTS ********//
  // Set user in context
  useEffect(() => {
    setUser(dataUser);
    setBoards(boardResponse.result);
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

  return {
    showModal,
    setShowModal,
    boards,
    validateAccessToBoard,
    searchBoardValue,
    handleSearchBoardValue,
    searchBoards,
    currentPage,
    handleNextPage,
    totalData,
    sessionExpired,
    setSessionExpired,
    router,
  };
};
