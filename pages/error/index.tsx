import Head from "next/head";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// Providers
import styled from "styled-components";
// Error Image
import ErrorImage from "@public/error.png";
import { colors } from "@styles/variables";

const Error = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Boards</title>
        <meta name="error screen" content="errors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <ErrorContainer>
          <ImageContainer>
            <Image
              src={ErrorImage}
              alt="error"
              layout="fill"
              objectFit="contain"
            />
          </ImageContainer>
          {router.query && router.query.errorMessage ? (
            <>
              <p>Oops! Something went wrong!</p>
              <p>{router.query.errorMessage}</p>
            </>
          ) : (
            <p>Oops! Something went wrong!</p>
          )}
        </ErrorContainer>
      </Container>
    </>
  );
};

export default Error;

//******** STYLES ********//

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: auto;
`;

const ErrorContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  text-align: center;
  p:nth-of-type(1) {
    margin-top: 15px;
    font-size: 1.5rem;
    font-weight: bold;
  }
  p:nth-of-type(2) {
    color: ${colors.alert};
  }
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  align-self: center;
`;
