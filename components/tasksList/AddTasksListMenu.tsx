import React, { useState } from "react";
// Providers
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import sanitizeHTML from "sanitize-html";
// Components & Styled components
import { Button } from "@styles/common/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
  tasksListRef: React.RefObject<HTMLDivElement>;
}

export const AddTasksListMenu = ({
  open,
  onClose,
  onSave,
  tasksListRef,
}: Props) => {
  //******** STATES ********//
  const [inputValue, setInputValue] = useState("");

  return (
    <Container ref={tasksListRef} open={open}>
      <Title>New Tasks List</Title>
      <input
        type="text"
        placeholder="Title"
        value={inputValue}
        onChange={(e) => {
          const value = sanitizeHTML(e.target.value, {
            allowedTags: ["strong"],
            allowedAttributes: {},
          });
          setInputValue(value);
        }}
      />
      <MdOutlineClose
        onClick={() => {
          setInputValue("");
          onClose();
        }}
      />
      <Button
        type="button"
        onClick={() => {
          onSave(inputValue);
          setInputValue("");
          if (inputValue) {
            onClose();
          }
        }}
      >
        Save
      </Button>
    </Container>
  );
};

//******* STYLES *******//

interface SProps {
  open?: boolean;
}

const Container = styled.div<SProps>`
  display: ${(props) => (props.open ? "block" : "none")};
  width: 250px;
  padding: 15px 10px;
  position: absolute;
  top: 50px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  background-color: white;
  border-radius: 5px;
  input {
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    outline: none;
    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
  }
  svg {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
`;

const Title = styled.h4`
  margin: 5px 0px;
`;
