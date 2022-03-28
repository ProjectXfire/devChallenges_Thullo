import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
// Providers
import { toast } from "react-toastify";
// Models
import { TPermission } from "@models/permission";
// Services
import {
  getAllPermissionsReq,
  getUserPermissionsByBoardReq,
  updateUserPermissionsReq,
} from "@services/app/permission";
// Context
import { BoardContext } from "@utils/context/board/BoardContext";

export const usePermissions = () => {
  //******** VARIABLES ********//
  const router = useRouter();

  //******** CONTEXT ********//
  const {
    states: { selectedUser, selectedBoard },
  } = useContext(BoardContext);

  //******** STATES ********//
  const [permissions, setPermissions] = useState<TPermission[]>([]);
  const [userPermissions, setUserPermissions] = useState<TPermission[]>([]);

  //******** METHODS ********//
  const updateUserPermissions = async (permissions: string[]) => {
    try {
      if (selectedUser && permissions.length > 0) {
        await updateUserPermissionsReq(null, {
          userId: selectedUser._id,
          boardId: selectedBoard._id,
          permissions: permissions,
          authBoardId: selectedBoard._id,
        });
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

  const fetchPermissions = async () => {
    try {
      if (selectedUser) {
        const permissions = await getAllPermissionsReq(null);
        const userPermissionsByBoard = await getUserPermissionsByBoardReq(
          null,
          selectedUser._id,
          selectedBoard._id
        );
        setPermissions(permissions);
        setUserPermissions(userPermissionsByBoard.permissions);
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

  //******** EFFECTS ********//
  // Get all permissions and user permissions
  useEffect(() => {
    fetchPermissions();
  }, []);

  return {
    permissions,
    userPermissions,
    selectedUser,
    updateUserPermissions,
  };
};
