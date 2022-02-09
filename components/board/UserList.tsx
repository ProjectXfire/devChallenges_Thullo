import React from "react";
import Image from "next/image";
// Providers
import styled from "styled-components";
// Models
import { TUser } from "@models/user";
// Components
import { Members } from "@components/common/members";

interface PropsUsers {
  users: TUser[];
  usersRef: React.RefObject<HTMLDivElement>;
  open: boolean;
}

interface PropsUser {
  user: TUser;
}

export const UsersList = ({ users, usersRef, open }: PropsUsers) => {
  return (
    <Container ref={usersRef} open={open}>
      <p>Members</p>
      {users.map((item) => (
        <User user={item} key={item._id} />
      ))}
    </Container>
  );
};

const User = ({ user }: PropsUser) => {
  return (
    <SUser key={user._id}>
      <Members user={user} />
      <p>{`${user.name} ${user.lastname}`}</p>
    </SUser>
  );
};

//******** STYLES ********//

interface SProps {
  open?: boolean;
}

const Container = styled.div<SProps>`
  display: ${(props) => (props.open ? "block" : "none")};
  max-width: 300px;
  height: 300px;
  margin: 10px 0;
  padding: 10px;
  position: absolute;
  top: 30px;
  flex-direction: column;
  font-size: 0.9rem;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow: auto;
  background-color: white;
  z-index: 1;
  p:nth-child(1) {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
`;

const SUser = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  gap: 10px;
  p:nth-child(1) {
    min-width: 40px;
    padding: 5px 2px;
    text-align: center;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
  }
`;

const ImageNext = styled(Image)`
  border-radius: 5px;
`;
