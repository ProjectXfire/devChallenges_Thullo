import React, { ChangeEvent } from "react";
import Image from "next/image";
// Providers
import styled from "styled-components";
import {
  MdClear,
  MdMode,
  MdOutlineDescription,
  MdSupervisorAccount,
  MdOutlineLabelImportant,
  MdImage,
  MdHomeWork,
  MdAdd,
} from "react-icons/md";
import sanitizeHTML from "sanitize-html";
// Utils
import { useTask } from "@utils/hook/useTask";
// Default image
import TaskCoverTemplate from "@public/tasktemplate.jpg";
// Components & styled component
import { colors, device } from "@styles/variables";
import { Button } from "@styles/common/Button";
import { Background } from "@styles/common/Background";
import { SearchByTyping } from "@components/common/SearchByTyping";
import { Members } from "@components/common/members";
import { Team } from "@components/common/team";
import { CardModalContainer } from "@components/common/cardModalContainer";

interface Props {
  baseUrl: string;
  token: string;
}

export const TaskEdit = ({ baseUrl, token }: Props) => {
  //******** TASK HOOK ********//
  const {
    taskError,
    selectedTask,
    selectedTaskBelongToList,
    setSelectedTask,
    activeTextarea,
    setActiveTextarea,
    textareaValue,
    setTextareaValue,
    updateTaskDescription,
    updateTaskCover,
    showHideTaskMembersMenu,
    showTaskMembers,
    setShowTaskMembers,
    boardMembersRef,
    showBoardMembers,
    setShowBoardMembers,
    selectedItem,
    setSelectedItem,
    assignMemberFromTask,
    removeMemberFromTask,
    searchedMembers,
    cleanSearchedMembers,
    onSearchedMembers,
  } = useTask({
    baseUrl,
    token,
  });

  //******** METHODS *******//
  // Loader cover
  const loaderCover = () => {
    return selectedTask?.cover as string;
  };

  return (
    <>
      {selectedTask && (
        <>
          <Container>
            <CloseIcon>
              <Button
                onClick={() => {
                  setSelectedTask(null, "");
                  setShowTaskMembers(false);
                }}
              >
                <MdClear size={15} />
              </Button>
            </CloseIcon>
            {selectedTask.cover ? (
              <ImageContainer>
                <ImageNext
                  loader={loaderCover}
                  src="cover"
                  alt="cover"
                  layout="fill"
                  objectFit="cover"
                />
              </ImageContainer>
            ) : (
              <ImageContainer>
                <ImageNext
                  src={TaskCoverTemplate}
                  alt="cover-template"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </ImageContainer>
            )}
            <ContentContainer>
              <Actions>
                <FieldHeader>
                  <p>
                    <MdHomeWork /> Actions
                  </p>
                </FieldHeader>
                <FieldContent>
                  <FieldContentAction flexDirection="column">
                    <Button
                      type="button"
                      width="150px"
                      bkgColor={colors.grey}
                      textColor="grey"
                      flexStar
                      onClick={showHideTaskMembersMenu}
                    >
                      <MdSupervisorAccount size={20} />
                      Members
                    </Button>
                    {showTaskMembers && (
                      <TaskMembersContainer>
                        <TaskMembers>
                          {selectedTask.members.map((user) => (
                            <Team
                              key={user._id}
                              user={user}
                              index={-1}
                              onRemoveMember={(userId) =>
                                removeMemberFromTask(userId)
                              }
                            />
                          ))}
                        </TaskMembers>
                        <ActionBoardMembers>
                          <Button
                            type="button"
                            width="150px"
                            bkgColor={colors.lightBlue}
                            textColor={colors.blue}
                            spaceBetween
                            onClick={() => setShowBoardMembers(true)}
                          >
                            Assign a member
                            <MdAdd />
                          </Button>
                          {showBoardMembers && (
                            <CardModalContainer
                              cardRef={boardMembersRef}
                              title="Board Members"
                              subTitle="Assing a member from board"
                              btnText="Assign"
                              iconTop="8px"
                              iconRight="8px"
                              showFloatIcon
                              onIconClick={() => {
                                setShowBoardMembers(false);
                                setSelectedItem("");
                              }}
                              onActionClick={assignMemberFromTask}
                            >
                              <SearchByTyping
                                onSearch={(value) => onSearchedMembers(value)}
                                onClean={cleanSearchedMembers}
                              />
                              <BoardMembers>
                                {searchedMembers.map((user) => (
                                  <BoardMember
                                    key={user._id}
                                    selectedItem={user._id === selectedItem}
                                    onClick={() => setSelectedItem(user._id)}
                                  >
                                    <Members user={user} />
                                    <p>{`${user.name} ${user.lastname}`}</p>
                                  </BoardMember>
                                ))}
                              </BoardMembers>
                            </CardModalContainer>
                          )}
                        </ActionBoardMembers>
                      </TaskMembersContainer>
                    )}
                    <Button
                      type="button"
                      width="150px"
                      textColor="grey"
                      bkgColor={colors.grey}
                      flexStar
                    >
                      <MdOutlineLabelImportant size={20} />
                      Labels
                    </Button>
                    <InputCover>
                      <MdImage size={20} /> Cover
                      <input
                        type="file"
                        accept="images/*"
                        onChange={(e) => updateTaskCover(e)}
                      />
                    </InputCover>
                  </FieldContentAction>
                </FieldContent>
              </Actions>
              <Content>
                <Header>
                  <Title>{selectedTask.title}</Title>
                  <p>
                    In list <strong>{selectedTaskBelongToList}</strong>
                  </p>
                </Header>
                <FieldHeader>
                  <p>
                    <MdOutlineDescription /> Description
                  </p>
                  {activeTextarea && (
                    <Button
                      type="button"
                      onClick={() => setActiveTextarea(false)}
                    >
                      <MdMode />
                      Edit
                    </Button>
                  )}
                </FieldHeader>
                <FieldContent disabled={activeTextarea}>
                  <textarea
                    disabled={activeTextarea}
                    rows={10}
                    value={textareaValue}
                    onChange={(e) => {
                      const value = sanitizeHTML(e.target.value, {
                        allowedTags: [],
                        allowedAttributes: {},
                      });
                      setTextareaValue(value);
                    }}
                  ></textarea>
                  {!activeTextarea && (
                    <FieldContentAction actionFlexEnd>
                      <Button
                        type="button"
                        bkgColor={colors.grey}
                        textColor="black"
                        onClick={() => {
                          setActiveTextarea(true);
                          setTextareaValue(selectedTask.description || "");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        bkgColor={colors.green}
                        onClick={() => {
                          setActiveTextarea(true);
                          updateTaskDescription(
                            selectedTask._id,
                            textareaValue
                          );
                        }}
                      >
                        Save
                      </Button>
                    </FieldContentAction>
                  )}
                </FieldContent>
              </Content>
            </ContentContainer>
          </Container>
          <Background
            onClick={() => {
              setSelectedTask(null, "");
              setShowTaskMembers(false);
            }}
          />
        </>
      )}
    </>
  );
};

//******** STYLES ********//

interface SProps {
  disabled?: boolean;
  actionFlexEnd?: boolean;
  flexDirection?: "column" | "row";
  selectedItem?: boolean;
}

const Container = styled.section`
  max-width: 750px;
  padding: 20px;
  position: absolute;
  left: 5px;
  right: 5px;
  top: 70px;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 3;
  @media ${device.tablet} {
    left: calc(50% - 375px);
    right: 0;
    flex-flow: row-reverse;
    gap: 20px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

const ImageNext = styled(Image)`
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    flex-flow: row-reverse;
    gap: 20px;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

// Actions buttons

const Actions = styled.div`
  width: 250px;
  position: relative;
  @media ${device.tablet} {
    width: 400px;
  }
`;

const TaskMembersContainer = styled.div``;

const TaskMembers = styled.div`
  max-height: 300px;
  margin-bottom: 10px;
  overflow: auto;
`;

const ActionBoardMembers = styled.div`
  position: relative;
`;

const BoardMembers = styled.div`
  max-height: 300px;
  width: 240px;
  overflow: auto;
`;

const BoardMember = styled.div<SProps>`
  margin-bottom: 10px;
  padding: 3px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.selectedItem ? colors.lightBlue : "transparent"};
  border-radius: 5px;
`;

// Task content

const Content = styled.div`
  width: 100%;
`;

const Header = styled.div`
  margin-bottom: 20px;
  p {
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.2);
  }
  strong {
    color: black;
  }
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 5px;
`;

const InputCover = styled.label`
  width: 150px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  background-color: ${colors.grey};
  border-radius: 5px;
  color: grey;
  cursor: pointer;
  input[type="file"] {
    display: none;
  }
`;

const FieldHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  p {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.2);
  }
`;

const FieldContent = styled.div<SProps>`
  margin-bottom: 30px;
  textarea {
    min-width: 100% !important;
    padding: 5px;
    border: ${(props) =>
      props.disabled ? "none" : "1px solid rgba(0,0,0,0.3)"};
    border-radius: 10px;
    resize: none;
    outline: none;
  }
`;

const FieldContentAction = styled.div<SProps>`
  margin-top: 10px;
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection === "column" ? "column" : "row"};
  justify-content: ${(props) => (props.actionFlexEnd ? "flex-end" : "none")};
  gap: 10px;
`;
