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
import { CardModalContainer } from "@components/common/cardModalContainer";
import { SearchByAction } from "@components/common/SearchByAction";

interface Props {
  addMemberRef: RefObject<HTMLDivElement>;
  searchUsers: (searchValue: string) => Promise<void>;
  searchedUsers: TUser[];
  addUserToBoard: (userId: string) => Promise<void>;
}

export const AddUserMenu = ({
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
    <CardModalContainer
      cardRef={addMemberRef}
      title="Invite Board"
      subTitle="Search users you want to invite"
      btnText="Invite"
      iconTop="8px"
      iconRight="8px"
      onActionClick={() => {
        addUserToBoard(selectedUser);
        setSelectedUser("");
        setSearchValue("");
      }}
    >
      <SearchByAction
        inputValue={searchValue}
        onChange={(e) => handleSearchValue(e)}
        onClick={() => searchUsers(searchValue)}
      />
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
      </Content>
    </CardModalContainer>
  );
};

//******** STYLES ********//

interface SProps {
  selectedUser?: boolean;
}

const Content = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchedMembersContainer = styled.div<SProps>`
  flex-direction: column;
  width: 260px;
  max-height: 300px;
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
