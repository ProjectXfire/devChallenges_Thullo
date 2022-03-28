import React from "react";
import styled from "styled-components";

const colors = [
  "#64dd17",
  "#f44336",
  "#8e24aa",
  "#3d5afe",
  "#0097a7",
  "#2e7d32",
  "#ffab00",
  "#ffea00",
  "#6d4c41",
  "#455a64",
  "#c0ca33",
  "#e91e63",
];

interface Props {
  getColor: (color: string) => void;
}

export const BlockColors = ({ getColor }: Props) => {
  return (
    <Container>
      {colors.map((item, index) => (
        <Block key={index} color={item} onClick={() => getColor(item)} />
      ))}
    </Container>
  );
};

interface SProps {
  color?: string;
}

const Container = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
`;

const Block = styled.div<SProps>`
  height: 30px;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  cursor: pointer;
`;
