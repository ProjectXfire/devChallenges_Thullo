import React, { useEffect, useState } from "react";
// Permissions
import { TPermission } from "@models/permission";
// Components & styled components
import { Permission } from "@components/board/permission";
import styled from "styled-components";
import { Button } from "@styles/common/Button";
import { colors } from "@styles/variables";

interface Props {
  permissions: TPermission[];
  userPermissions: TPermission[];
  setOpenSideBoard: React.Dispatch<React.SetStateAction<boolean>>;
  setshowPermissions: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdatePermissions: (permissions: string[]) => void;
}

export const UserPermissions = ({
  permissions,
  userPermissions,
  setOpenSideBoard,
  setshowPermissions,
  onUpdatePermissions,
}: Props) => {
  const [grantedPermissions, setGrantedPermissions] = useState<string[]>([]);

  const handleGrantedPermissions = (isGranted: boolean, permId: string) => {
    if (isGranted) {
      setGrantedPermissions([...grantedPermissions, permId]);
    } else {
      const removePermission = grantedPermissions.filter(
        (item) => item !== permId
      );
      setGrantedPermissions(removePermission);
    }
  };

  useEffect(() => {
    const userPermissionsGranted = userPermissions.map((perm) => perm._id);
    setGrantedPermissions(userPermissionsGranted);
  }, [userPermissions]);

  return (
    <>
      {permissions && userPermissions && (
        <Container>
          <h3>Admin</h3>
          {permissions.map((perm) => {
            if (perm.name === "Admin") {
              const exist = userPermissions.some(
                (userP) => userP._id === perm._id
              );
              return (
                <Permission
                  key={perm._id}
                  permission={perm}
                  exist={exist}
                  handleGrantedPermissions={(isgranted, permId) =>
                    handleGrantedPermissions(isgranted, permId)
                  }
                />
              );
            }
          })}
          <h3>Board</h3>
          {permissions.map((perm) => {
            if (perm.name === "Board") {
              const exist = userPermissions.some(
                (userP) => userP._id === perm._id
              );
              return (
                <Permission
                  key={perm._id}
                  permission={perm}
                  exist={exist}
                  handleGrantedPermissions={(isgranted, permId) =>
                    handleGrantedPermissions(isgranted, permId)
                  }
                />
              );
            }
          })}
          <h3>List</h3>
          {permissions.map((perm) => {
            if (perm.name === "List") {
              const exist = userPermissions.some(
                (userP) => userP._id === perm._id
              );

              return (
                <Permission
                  key={perm._id}
                  permission={perm}
                  exist={exist}
                  handleGrantedPermissions={(isgranted, permId) =>
                    handleGrantedPermissions(isgranted, permId)
                  }
                />
              );
            }
          })}
          <h3>Task</h3>
          {permissions.map((perm) => {
            if (perm.name === "Task") {
              const exist = userPermissions.some(
                (userP) => userP._id === perm._id
              );
              return (
                <Permission
                  key={perm._id}
                  permission={perm}
                  exist={exist}
                  handleGrantedPermissions={(isgranted, permId) =>
                    handleGrantedPermissions(isgranted, permId)
                  }
                />
              );
            }
          })}
          <Actions>
            <Button
              bkgColor={colors.grey}
              textColor="black"
              type="button"
              onClick={() => {
                setOpenSideBoard(true);
                setshowPermissions(false);
              }}
            >
              Cancel
            </Button>
            <Button
              bkgColor={colors.green}
              type="button"
              onClick={() => {
                setOpenSideBoard(true);
                setshowPermissions(false);
                onUpdatePermissions(grantedPermissions);
              }}
            >
              Save
            </Button>
          </Actions>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  margin-bottom: 15px;
  h3 {
    margin-top: 8px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
