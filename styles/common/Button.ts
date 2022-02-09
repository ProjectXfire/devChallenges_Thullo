import styled from "styled-components";
// Variables
import { colors } from "@styles/variables";

interface Prop {
  fullWidth?: boolean;
  bkgColor?: string;
  textColor?: string;
  spaceBetween?: boolean;
  flexStar?: boolean;
  width?: string;
  borderColor?: string;
}

export const Button = styled.button<Prop>`
  width: ${(props) =>
    props.fullWidth ? "100%" : props.width ? props.width : "auto"};
  display: flex;
  align-items: center;
  justify-content: ${(props) => {
    if (props.spaceBetween) {
      return "space-between";
    }
    if (props.flexStar) {
      return "flex-start";
    }
    return "center";
  }};
  gap: 5px;
  padding: 6px 12px;
  background-color: ${(props) =>
    props.bkgColor ? props.bkgColor : colors.blue};
  color: ${(props) => (props.textColor ? props.textColor : "white")};
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : "none"};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.9);
  }
`;
