import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
// Providers
import { toast } from "react-toastify";
// Models
import { TBoard } from "@models/board";
// Models
import { TUser } from "@models/user";
// Services
import { findUserInBoardReq } from "@services/app/board";
// User context
import { UserContext } from "@utils/context/user/UserContext";
import { BoardContext } from "@utils/context/board/BoardContext";

interface Props {
  dataUser: TUser;
  dataBoards: TBoard[];
}

export const useBoards = ({ dataBoards, dataUser }: Props) => {
  //******** VARIABLES ********//
  const router = useRouter();

  //******** CONTEXTS ********//
  // User
  const { setUser } = useContext(UserContext);
  const {
    setBoards,
    states: { boards },
  } = useContext(BoardContext);

  //******** STATES ********//
  // Modal
  const [showModal, setShowModal] = useState(false);
  // Error
  const [error, setError] = useState("");

  //******** METHODS ********//
  const validateAccessToBoard = async (boardId: string) => {
    setError("");
    try {
      const isAMember = await findUserInBoardReq(null, boardId);
      if (isAMember) {
        router.push(`/${boardId}`);
        return;
      }
      toast.error("You are not a member, please contact with the admin");
    } catch (error: any) {
      setError(error.message);
    }
  };

  //******** EFFECTS ********//
  // Set user in context
  useEffect(() => {
    setUser(dataUser);
    setBoards(dataBoards);
  }, []);

  return {
    showModal,
    setShowModal,
    boards,
    validateAccessToBoard,
    error,
  };
};
