import { capLetters } from "@utils/capLetters";
import React from "react";
import styled from "styled-components";

interface Props {
  name: string;
  lastname: string;
}

export const DefaultImage = ({ name, lastname }: Props) => {
  return <Container>{capLetters(`${name} ${lastname}`)}</Container>;
};

//******** STYLES ********//

const Container = styled.div`
  min-width: 30px;
  height: 30px;
  padding: 4px;
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: center;
  font-size: 0.9rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
`;
