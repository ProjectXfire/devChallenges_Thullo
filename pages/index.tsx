import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
// Providers
import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import sanitizeHTML from "sanitize-html";
// Models
import { TUser } from "@models/user";
import { TBoardResponse } from "@models/board";
// Services
import { getUserReq } from "@services/app/user";
import { getBoardsReq } from "@services/app/board";
// Utils
import { parseCookies } from "@utils/parseCookies";
import { useBoards } from "@utils/hook/useBoards";
import { DOCUMENTS_PER_PAGE } from "@utils/variables";
// Components & Styled components
import { BoardCard } from "@components/board/card";
import { BoardModal } from "@components/board/newBoard/modal";
import { SearchByAction } from "@components/common/SearchByAction";
import { Pagination } from "@components/common/Pagination";
import { SessionExpired } from "@components/common/sessionExpired";
import { Button } from "@styles/common/Button";
import { Background } from "@styles/common/Background";
import { colors } from "@styles/variables";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const token = parseCookies(ctx);
    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const user = await getUserReq(token);
    const boardResponse = await getBoardsReq(token, 1, DOCUMENTS_PER_PAGE);
    return {
      props: {
        user,
        boardResponse,
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
}

const Home = ({ user, boardResponse }: Props) => {
  //******** MAIN HOOK  ********//
  const {
    showModal,
    setShowModal,
    boards,
    validateAccessToBoard,
    searchBoardValue,
    handleSearchBoardValue,
    searchBoards,
    currentPage,
    handleNextPage,
    totalData,
    sessionExpired,
    setSessionExpired,
  } = useBoards({
    dataUser: user,
    boardResponse: boardResponse,
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
        <SearchContainer>
          <SearchByAction
            placeholder="Board..."
            inputValue={searchBoardValue}
            onChange={(e) => {
              const value = sanitizeHTML(e.target.value, {
                allowedTags: [],
                allowedAttributes: {},
              });
              handleSearchBoardValue(value);
            }}
            onClick={searchBoards}
          />
        </SearchContainer>
        <Pagination
          currentPage={currentPage}
          totalDocuments={totalData}
          documentsPerPage={boardResponse.documentsPerPage}
          onChange={(page) => handleNextPage(page)}
        />
        <Content>
          {showModal && <BoardModal onClose={() => setShowModal(false)} />}
          {boards.map((item, index) => (
            <BoardCard
              key={item._id}
              board={item}
              validateAccessToBoard={validateAccessToBoard}
            />
          ))}
        </Content>
        {showModal && (
          <>
            <Background onClick={() => setShowModal(false)} />
          </>
        )}
        <ToastContainer autoClose={2000} theme="dark" />
        {sessionExpired && (
          <>
            <SessionExpired
              onClick={() => {
                setSessionExpired(false);
                window.location.reload();
              }}
            />
            <Background hideCursorPointer />
          </>
        )}
      </Container>
    </>
  );
};

export default Home;

//******** STYLES ********//
export const Container = styled.main`
  max-width: 1000px;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding-top: 80px;
  padding-bottom: 20px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: ${colors.greyVariant};
  overflow: auto;
`;

const Header = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  p:nth-of-type(1) {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const SearchContainer = styled.div`
  max-width: 310px;
`;

const Content = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;
