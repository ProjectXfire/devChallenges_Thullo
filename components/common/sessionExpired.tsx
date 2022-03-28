import React from "react";
// Providers
import styled from "styled-components";
// Components & styled components
import { Button } from "@styles/common/Button";
import { colors } from "@styles/variables";

interface Props {
  onClick: () => void;
}

export const SessionExpired = ({ onClick }: Props) => {
  return (
    <Container>
      <p>Session has expired, please login again.</p>
      <Button type="button" onClick={onClick}>
        Login
      </Button>
    </Container>
  );
};

//******** STYLES ********//
const Container = styled.div`
  width: 220px;
  padding: 15px;
  background-color: white;
  position: absolute;
  top: 150px;
  left: calc(50% - 110px);
  z-index: 10;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  p:nth-of-type(1) {
    margin-bottom: 8px;
    color: ${colors.alert};
    font-weight: bold;
  }
`;
