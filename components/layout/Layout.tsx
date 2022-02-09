import React from "react";
// Providers
import styled from "styled-components";
// Componentes
import { Header } from "@components/layout/Header";
import { Footer } from "@components/layout/Footer";
import { colors } from "@styles/variables";

export const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${colors.greyVariant};
`;
