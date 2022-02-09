import React, { RefObject, useRef, useState } from "react";
// Providers
import { MdSearch } from "react-icons/md";
import styled from "styled-components";
// Models
import { TUser } from "@models/user";
// Utils
import { capLetters } from "@utils/capLetters";
// Components & Styled components
import { Button } from "@styles/common/Button";
import { colors } from "@styles/variables";

interface Props {
  open: boolean;
  addMemberRef: RefObject<HTMLDivElement>;
  searchUsers: (searchValue: string) => Promise<void>;
  searchedUsers: TUser[];
  addUserToBoard: (userId: string) => Promise<void>;
}

export const AddUserMenu = ({
  open,
  addMemberRef,
  searchUsers,
  searchedUsers,
  addUserToBoard,
}: Props) => {
  //******** STATES ********//
  // Input value
  const [searchValue, setSearchValue] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  //******** METHODS ********//
  // Set input value
  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  // Set selected user
  const HandleSelectedUser = (userId: string) => {
    setSelectedUser(userId);
  };

  return (
    <Container open={open} ref={addMemberRef}>
      <Header>
        <p>Invite Board</p>
        <p>Search users you want to invite</p>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => handleSearchValue(e)}
          />
          <Button type="button" onClick={() => searchUsers(searchValue)}>
            <MdSearch size={20} />
          </Button>
        </div>
      </Header>
      <Content>
        {searchedUsers.length > 0 && (
          <SearchedMembersContainer>
            {searchedUsers.map((item) => (
              <SearchedMember
                key={item._id}
                selectedUser={item._id === selectedUser}
                onClick={() => HandleSelectedUser(item._id)}
              >
                <p>{capLetters(`${item.name} ${item.lastname}`)}</p>
                <p>{`${item.name} ${item.lastname}`}</p>
              </SearchedMember>
            ))}
          </SearchedMembersContainer>
        )}
        <Button
          type="button"
          onClick={() => {
            addUserToBoard(selectedUser);
            setSelectedUser("");
            setSearchValue("");
          }}
        >
          Invite
        </Button>
      </Content>
    </Container>
  );
};

//******** STYLES ********//

interface SProps {
  open?: boolean;
  selectedUser?: boolean;
}

const Container = styled.div<SProps>`
  min-width: 280px;
  padding: 5px 10px;
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  top: 40px;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;

  p:nth-child(1) {
    font-weight: bold;
  }
  p:nth-child(2) {
    color: rgba(0, 0, 0, 0.3);
  }
  div {
    margin: 10px 0;
    display: flex;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  input {
    width: 100%;
    border: none;
    outline: none;
    padding: 5px 10px;
    &::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchedMembersContainer = styled.div<SProps>`
  flex-direction: column;
  width: 260px;
  height: 300px;
  margin: 10px 0;
  padding: 10px;
  font-size: 0.9rem;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow: auto;
`;

const SearchedMember = styled.div<SProps>`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  background-color: ${(props) =>
    props.selectedUser ? "rgba(59,133,242,0.2)" : "white"};
  p:nth-child(1) {
    min-width: 40px;
    padding: 5px 2px;
    margin-right: 8px;
    text-align: center;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
  }
`;
