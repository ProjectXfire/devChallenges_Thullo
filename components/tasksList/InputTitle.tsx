import React from "react";
// Providers
import sanitizeHTML from "sanitize-html";
import styled from "styled-components";
// Components & Styled components
import { Button } from "@styles/common/Button";
import { colors } from "@styles/variables";

interface Props {
  title: string;
  placeholder: string;
  top?: string | "inherit";
  bottom?: string | "inherit";
  inputRef?: React.RefObject<HTMLDivElement>;
  setInputValue: (value: React.SetStateAction<string>) => void;
  inputValue: string;
  onSave: () => void;
  onCancel: () => void;
}

export const InputTitle = ({
  title,
  placeholder,
  top = "inherit",
  bottom = "inherit",
  inputRef,
  setInputValue,
  inputValue,
  onSave,
  onCancel,
}: Props) => {
  return (
    <Container ref={inputRef} top={top} bottom={(bottom = bottom)}>
      <p>{title}</p>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          const value = sanitizeHTML(e.target.value, {
            allowedTags: [],
            allowedAttributes: {},
          });
          setInputValue(value);
        }}
      />
      <InputTitleActions>
        <Button type="button" bkgColor={colors.alert} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onSave}>
          Save
        </Button>
      </InputTitleActions>
    </Container>
  );
};

interface SProps {
  top?: string | "inherit";
  bottom?: string | "inherit";
}

const Container = styled.div<SProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 10px;
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  right: 5px;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  input {
    width: 100%;
    margin-top: 6px;
    margin-bottom: 6px;
    padding: 4px 8px;
    outline: none;
    border: none;
    -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
  }
  p {
    font-size: 0.9rem;
  }
`;

const InputTitleActions = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 5px;
`;
