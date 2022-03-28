import React from "react";
// Providers
import styled from "styled-components";
import { MdClear } from "react-icons/md";

interface Props {
  title?: string;
  color?: string;
  onClick?: () => void;
  showAction?: boolean;
}

export const LabelTask = ({ title, color, showAction, onClick }: Props) => {
  return (
    <Container color={color} onClick={onClick}>
      <p>{title}</p>
      {showAction && <MdClear size={13} />}
    </Container>
  );
};

interface SProps {
  color?: string;
  showAction?: boolean;
}

const Container = styled.div<SProps>`
  min-width: 80px;
  padding: 2px 10px;
  display: flex;
  justify-content: ${(props) =>
    props.showAction ? "space-between" : "center"};
  align-items: center;
  align-self: flex-start;
  gap: 10px;
  background-color: ${(props) => props.color};
  border-radius: 10px;
  text-align: center;
  font-size: 0.8rem;
  color: white;
  svg {
    border: 1px solid white;
    border-radius: 50%;
    padding: 1px;
    cursor: pointer;
  }
`;
