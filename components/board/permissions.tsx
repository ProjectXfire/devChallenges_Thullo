import React from "react";
// Providers
import styled from "styled-components";
// Utils
import { usePermissions } from "@utils/hook/usePermissions";
// Contexts
import { device } from "@styles/variables";
// Components & styled components
import { Members } from "@components/common/members";
import { UserPermissions } from "@components/board/userPermissions";

interface Props {
  setOpenSideBoard: React.Dispatch<React.SetStateAction<boolean>>;
  setshowPermissions: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Permissions = ({
  setOpenSideBoard,
  setshowPermissions,
}: Props) => {
  //******** MAIN HOOK ********//
  const { permissions, userPermissions, selectedUser, updateUserPermissions } =
    usePermissions();

  return (
    <Container>
      {selectedUser && (
        <>
          <h2>Permissions</h2>
          <UserData>
            <Members user={selectedUser} height={50} width={50} />
            <p>
              {selectedUser.name} {selectedUser.lastname}
            </p>
          </UserData>
          <UserPermissions
            permissions={permissions}
            userPermissions={userPermissions}
            setOpenSideBoard={setOpenSideBoard}
            setshowPermissions={setshowPermissions}
            onUpdatePermissions={(permissions) =>
              updateUserPermissions(permissions)
            }
          />
        </>
      )}
    </Container>
  );
};

//******** STYLES ********//

const Container = styled.div`
  width: 300px;
  padding: 15px;
  position: absolute;
  top: 100px;
  left: calc(50% - 150px);
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 3;
  background-color: white;
  border-radius: 10px;
  overflow: auto;
  @media ${device.mobileL} {
    width: 400px;
    left: calc(50% - 200px);
  }
  @media ${device.tablet} {
    width: 500px;
    left: calc(50% - 250px);
  }
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;
