import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// Providers
import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import { ToastContainer } from "react-toastify";
// Models
import { TUser } from "@models/user";
import { TBoardResponse } from "@models/board";
// Services
import { getUserReq } from "@services/app/user";
import { getBoardsReq } from "@services/app/board";
// Utils
import { parseCookies } from "@utils/parseCookies";
import { useBoards } from "@utils/pages/useBoards";
// Components & Styled components
import { BoardCard } from "@components/board/card";
import { BoardModal } from "@components/board/newBoard/modal";
import { Button } from "@styles/common/Button";
import { Background } from "@styles/common/Background";
import { colors } from "@styles/variables";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const baseUrl = process.env.API_URL || "";
    const token = parseCookies(ctx);
    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const user = await getUserReq(baseUrl, token);
    const boardResponse = await getBoardsReq(baseUrl, token, 10, 1);
    return {
      props: {
        user,
        boardResponse,
        token,
        baseUrl,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};

interface Props {
  user: TUser;
  boardResponse: TBoardResponse;
  token: string;
  baseUrl: string;
}

const Home = ({ user, boardResponse, token, baseUrl }: Props) => {
  //******** MAIN HOOK  ********//
  const { showModal, setShowModal, boards, validateAccessToBoard, error } =
    useBoards({
      baseUrl,
      token,
      dataUser: user,
      dataBoards: boardResponse.result,
    });

  return (
    <>
      <Head>
        <title>Boards</title>
        <meta name="board screen" content="boards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header>
          <p>All Boards</p>
          <Button type="button" onClick={() => setShowModal(true)}>
            <MdAdd size={20} />
            <span>Add</span>
          </Button>
        </Header>
        <Content>
          {boards.map((item, index) => (
            <BoardCard
              key={index}
              board={item}
              validateAccessToBoard={validateAccessToBoard}
            />
          ))}
        </Content>
        <BoardModal
          baseUrl={baseUrl}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          token={token}
        />
        {showModal && <Background onClick={() => setShowModal(false)} />}
        <ToastContainer autoClose={2000} theme="dark" />
      </Container>
    </>
  );
};

export default Home;

//******** STYLES ********//
export const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: ${colors.greyVariant};
`;

const Header = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Content = styled.section`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;
