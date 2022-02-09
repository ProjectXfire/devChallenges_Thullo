import React from "react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
// Providers
import styled from "styled-components";
import { MdAdd, MdLock, MdMoreVert, MdPublic } from "react-icons/md";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ToastContainer } from "react-toastify";
// Models
import { TBoard } from "@models/board";
import { TUser } from "@models/user";
import { TTasksList } from "@models/tasksList";
// Services
import { getBoardReq } from "@services/app/board";
import { getUserReq } from "@services/app/user";
import { getAllTasksListByBoardReq } from "@services/app/tasksList";
// Utils
import { useBoard } from "@utils/hook/useBoard";
import { useTasksList } from "@utils/hook/useTasksList";
import { parseCookies } from "@utils/parseCookies";
// Components & styled components
import { Button } from "@styles/common/Button";
import { colors, device } from "@styles/variables";
import { Members } from "@components/common/members";
import { PublicPrivateMenu } from "@components/board/IsPublicMenu";
import { SideBoard } from "@components/board/Sideboard";
import { AddUserMenu } from "@components/board/AddUserMenu";
import { UsersList } from "@components/board/UserList";
import { TasksList } from "@components/tasksList/TasksList";
import { AddTasksListMenu } from "@components/tasksList/AddTasksListMenu";
import { TaskEdit } from "@components/task/editTask/TaskEdit";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const baseUrl = process.env.API_URL || "";
    const token = parseCookies(ctx);
    const id = ctx.params && ctx.params.id ? (ctx.params.id as string) : "";
    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const board = await getBoardReq(token, id);
    const user = await getUserReq(token);
    const tasksList = await getAllTasksListByBoardReq(token, board._id);
    return {
      props: {
        token,
        baseUrl,
        user,
        board,
        tasksList,
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
  board: TBoard;
  user: TUser;
  tasksList: TTasksList[];
  token: string;
  baseUrl: string;
}

const BoardTasksList = ({ baseUrl, token, user, board, tasksList }: Props) => {
  //******* BOARD HOOK ********//
  const {
    boardError,
    selectedBoard,
    isPublicMenuRef,
    showIsPublicMenu,
    handleIsPublicMenu,
    updateBoard,
    handleSideBoard,
    openSideBoard,
    setOpenSideBoard,
    onRemoveMember,
    showAddMemberMenu,
    handleAddMemberMenu,
    addMemberRef,
    searchUsers,
    searchedUsers,
    addUserToBoard,
    handleAUserList,
    showUsersList,
    usersListRef,
  } = useBoard({ board, user });
  //******* TASKS LIST HOOK ********//
  const {
    tasksListError,
    isBrowser,
    tasksListByBoard,
    onDragEnd,
    addTasksListMenuRef,
    showAddTasksListMenu,
    setShowAddTasksListMenu,
    addNewTasksList,
    updateTasksListTitle,
    deleteTasksList,
    addNewTask,
    deleteTask,
  } = useTasksList({ board, tasksList });

  return (
    <>
      <Head>
        <title>Boards</title>
        <meta name="Tasks list screen" content="taskslist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header>
          <HeaderMenu>
            {selectedBoard.isPublic ? (
              <Button
                type="button"
                bkgColor={colors.green}
                onClick={handleIsPublicMenu}
              >
                <MdPublic size={15} />
                Public
              </Button>
            ) : (
              <Button
                type="button"
                bkgColor={colors.alert}
                onClick={handleIsPublicMenu}
              >
                <MdLock size={15} />
                Private
              </Button>
            )}
            <PublicPrivateMenu
              isPublicMenuRef={isPublicMenuRef}
              isPublic={selectedBoard.isPublic}
              showIsPublicMenu={showIsPublicMenu}
              updateIsPublic={updateBoard}
            />
            {selectedBoard.members.slice(0, 2).map((item) => (
              <Members key={item._id} user={item} />
            ))}
            {selectedBoard.members.length > 2 && (
              <Button
                type="button"
                bkgColor="white"
                textColor="black"
                onClick={handleAUserList}
              >
                More
              </Button>
            )}
            <AddUserMenu
              open={showAddMemberMenu}
              addMemberRef={addMemberRef}
              searchUsers={searchUsers}
              searchedUsers={searchedUsers}
              addUserToBoard={addUserToBoard}
            />
            <UsersList
              usersRef={usersListRef}
              users={selectedBoard.members}
              open={showUsersList}
            />
            <Button type="button" onClick={handleAddMemberMenu}>
              <MdAdd size={15} />
            </Button>
          </HeaderMenu>
          <div>
            <Button
              type="button"
              bkgColor={colors.grey}
              textColor="black"
              onClick={handleSideBoard}
            >
              Show menu
              <MdMoreVert size={15} />
            </Button>
          </div>
          <SideBoard
            onClose={handleSideBoard}
            open={openSideBoard}
            setOpenSideBoard={setOpenSideBoard}
            onRemoveMember={onRemoveMember}
            updateDescription={updateBoard}
          />
        </Header>
        <Content>
          <Button
            bkgColor={colors.lightBlue}
            textColor={colors.blue}
            type="button"
            onClick={() => setShowAddTasksListMenu(true)}
          >
            Add new list
          </Button>
          <AddTasksListMenu
            open={showAddTasksListMenu}
            onClose={() => setShowAddTasksListMenu(false)}
            tasksListRef={addTasksListMenuRef}
            onSave={addNewTasksList}
          />
          {isBrowser ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
              >
                {(provided) => (
                  <TasksListContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasksListByBoard.map((item, index) => {
                      return (
                        <TasksList
                          key={item._id}
                          tasksList={item}
                          deleteTasksList={deleteTasksList}
                          updateTasksListTitle={updateTasksListTitle}
                          tasksListIndex={index}
                          addNewTask={addNewTask}
                          deleteTask={deleteTask}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </TasksListContainer>
                )}
              </Droppable>
            </DragDropContext>
          ) : null}
        </Content>
      </Container>
      <TaskEdit baseUrl={baseUrl} token={token} />
      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
};

export default BoardTasksList;

//******** STYLES ********//
interface SProps {
  isPublic?: boolean;
  isIsPublicMenuActive?: boolean;
}

const Container = styled.main`
  padding-top: 70px;
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
  @media ${device.tablet} {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Header = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const HeaderMenu = styled.div`
  position: relative;
  display: flex;
  gap: 5px;
`;

const Content = styled.section`
  position: relative;
  height: 1100px;
  margin-top: 20px;
  padding: 15px;
  background-color: ${colors.greyVariant};
  border-radius: 10px;
  overflow: auto;
`;

const TasksListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;
