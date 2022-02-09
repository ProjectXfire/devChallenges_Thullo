import styled from "styled-components";
import { colors } from "@styles/variables";

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
`;

export const BottomMessage = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
  a {
    margin-left: 5px;
    color: ${colors.darkblue};
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Section = styled.section`
  width: 100%;
  max-width: 500px;
  padding: 0 10px;
`;
