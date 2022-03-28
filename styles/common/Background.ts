import { device } from "@styles/variables";
import styled from "styled-components";

interface SProps {
  hideCursorPointer?: boolean;
  zIndex?: number;
}

export const Background = styled.div<SProps>`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.5;
  cursor: ${(props) => (props.hideCursorPointer ? "auto" : "pointer")};
  z-index: ${(props) => (props.zIndex ? props.zIndex : 2)};
`;
