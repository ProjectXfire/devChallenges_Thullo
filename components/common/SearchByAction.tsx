import React from "react";
// Providers
import { MdSearch } from "react-icons/md";
import styled from "styled-components";
// Components & styled component
import { Button } from "@styles/common/Button";

interface Props {
  inputValue: string;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchByAction = ({ inputValue, onClick, onChange }: Props) => {
  return (
    <Container>
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={onChange}
      />
      <Button type="button" onClick={onClick}>
        <MdSearch size={20} />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin: 10px 0;
  display: flex;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
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
