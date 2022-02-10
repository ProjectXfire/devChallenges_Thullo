import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  iconTop?: string;
  iconRight?: string;
  iconBkgColor?: string;
  onClick?: () => void;
}

export const FloatIcon = ({
  children,
  iconBkgColor,
  iconRight,
  iconTop,
  onClick,
}: Props) => {
  return (
    <ActionIcon
      iconBkgColor={iconBkgColor}
      iconRight={iconRight}
      iconTop={iconTop}
      onClick={onClick}
      type="button"
    >
      {children}
    </ActionIcon>
  );
};

interface SProps {
  iconTop?: string;
  iconRight?: string;
  iconBkgColor?: string;
}

const ActionIcon = styled.button<SProps>`
  padding: 4px;
  display: flex;
  position: absolute;
  top: ${(props) => props.iconTop};
  right: ${(props) => props.iconRight};
  z-index: 1;
  background-color: white;
  border-radius: 50%;
  background-color: ${(props) =>
    props.iconBkgColor ? props.iconBkgColor : "black"};
  cursor: pointer;
  border: none;
  &:active {
    transform: scale(0.9);
  }
`;
