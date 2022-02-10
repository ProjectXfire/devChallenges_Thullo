import React, { useContext } from "react";
import Image from "next/image";
// Providers
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
// Models
import { TUser } from "@models/user";
// Images
import DefaultImgUser from "@public/favicon.ico";
import { colors } from "@styles/variables";
import { Button } from "@styles/common/Button";

interface Props {
  user: TUser;
  index: number;
  onRemoveMember: (value: string, name: string) => void;
}

export const Team = ({ user, index, onRemoveMember }: Props) => {
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
            width={30}
            height={30}
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
        <Button
          type="button"
          bkgColor={colors.alert}
          onClick={() =>
            onRemoveMember(user._id, `${user.name} ${user.lastname}`)
          }
        >
          <FaTrash size={15} />
        </Button>
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
  font-size: 0.9rem;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
