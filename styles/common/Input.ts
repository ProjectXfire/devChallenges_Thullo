import { colors } from "@styles/variables";
import styled from "styled-components";

interface Props {
  disabled?: boolean;
  isButton?: boolean;
  bkgColor?: string;
  textColor?: string;
}

export const InputGroup = styled.div<Props>`
  display: flex;
  padding: 10px 15px;
  margin-bottom: 10px;
  gap: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${colors.grey};
  border-radius: 5px;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  &:focus-within {
    border: 1.5px solid rgba(59, 133, 242, 0.5);
  }
  input {
    width: 100%;
    border: none;
    background-color: ${colors.grey};
    outline: none;
    color: black;
    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
      opacity: 0.5;
    }
  }
`;

export const InputFile = styled.label<Props>`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.isButton ? props.bkgColor : "transparent"};
  padding: ${(props) => (props.isButton ? "6px 12px" : "0 0")};
  border-radius: ${(props) => (props.isButton ? "8px" : "none")};
  font-size: ${(props) => (props.isButton ? "0.9rem" : "1rem")};
  color: ${(props) => (props.isButton ? props.textColor : "black")};
  &:hover {
    opacity: 0.6;
  }
  svg {
    margin-right: 5px;
    margin-left: 5px;
  }
  cursor: pointer;
  input[type="file"] {
    display: none;
  }
`;
