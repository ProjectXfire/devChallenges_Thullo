import React, { useContext } from "react";
import Image from "next/image";
// Providers
import styled from "styled-components";
// Models
import { TUser } from "@models/user";
// Context
import { BoardContext } from "@utils/context/board/BoardContext";
// Images
import DefaultImgUser from "@public/favicon.ico";
import { colors } from "@styles/variables";

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
        <button
          type="button"
          onClick={() =>
            onRemoveMember(user._id, `${user.name} ${user.lastname}`)
          }
        >
          Remove
        </button>
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
  button {
    background-color: white;
    outline: none;
    border: 1.5px solid ${colors.alert};
    border-radius: 10px;
    color: ${colors.alert};
    cursor: pointer;
    &:active {
      transform: scale(0.9);
    }
  }
`;
