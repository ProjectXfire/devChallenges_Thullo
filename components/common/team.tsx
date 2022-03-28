import React, { useContext } from "react";
import Image from "next/image";
// Providers
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { MdLock } from "react-icons/md";
// Models
import { TUser } from "@models/user";
// Contexts
import { BoardContext } from "@utils/context/board/BoardContext";
// Images
import DefaultImgUser from "@public/favicon.ico";
import { colors } from "@styles/variables";
import { Button } from "@styles/common/Button";

interface Props {
  user: TUser;
  index: number;
  onRemoveMember: (value: string, name: string) => void;
  showPermissionIcon?: boolean;
  onShowPermissions?: () => void;
}

export const Team = ({
  user,
  index,
  onRemoveMember,
  showPermissionIcon,
  onShowPermissions = () => {},
}: Props) => {
  //******** CONTEXT *******//
  const { setSelectedUser } = useContext(BoardContext);

  //******** Loader avatar user ********//
  const loaderAvatar = () => {
    return user.avatar;
  };

  return (
    <Container>
      <div>
        {user.avatar ? (
          <Image
            src="avatar"
            loader={loaderAvatar}
            width={25}
            height={25}
            alt="avatar"
          />
        ) : (
          <Image src={DefaultImgUser} width={30} height={30} alt="avatar" />
        )}
        <p>{user.name + " " + user.lastname}</p>
      </div>
      {index === 0 ? (
        <span>Admin</span>
      ) : (
        <div>
          {showPermissionIcon && (
            <Button
              type="button"
              bkgColor={colors.blue}
              onClick={() => {
                onShowPermissions();
                setSelectedUser(user);
              }}
            >
              <MdLock size={12} />
            </Button>
          )}
          <Button
            type="button"
            bkgColor={colors.alert}
            onClick={() =>
              onRemoveMember(user._id, `${user.name} ${user.lastname}`)
            }
          >
            <FaTrash size={12} />
          </Button>
        </div>
      )}
    </Container>
  );
};

//******* STYLES ********//
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.8rem;
  div:nth-of-type(1) {
    display: flex;
    align-items: center;
    gap: 8px;
    p:nth-of-type(1) {
      margin: 0;
    }
  }
  div:nth-of-type(2) {
    display: flex;
    gap: 5px;
  }
`;
