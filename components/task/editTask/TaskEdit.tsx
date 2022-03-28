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
  MdOutlineAttachFile,
  MdChat,
} from "react-icons/md";
import { BsChatFill } from "react-icons/bs";
import sanitizeHTML from "sanitize-html";
// Utils
import { useTask } from "@utils/hook/useTask";
// Default image
import TaskCoverTemplate from "@public/tasktemplate.jpg";
// Components & styled component
import { colors, device } from "@styles/variables";
import { Button } from "@styles/common/Button";
import { Background } from "@styles/common/Background";
import { InputGroup } from "@styles/common/Input";
import { SpaceBetweenContainer } from "@styles/common/SpaceBetweenContainer";
import { SearchByTyping } from "@components/common/SearchByTyping";
import { Members } from "@components/common/members";
import { Team } from "@components/common/team";
import { CardModalContainer } from "@components/common/cardModalContainer";
import { BlockColors } from "@components/common/blockColors";
import { LabelTask } from "@components/common/labelTask";
import { Alert } from "@styles/common/Alert";
import { CommentBox } from "@components/common/commentBox";
import { Comments } from "@components/comment/comments";
import { Attachments } from "@components/attachment/attachments";

export const TaskEdit = () => {
  //******** TASK HOOK ********//
  const {
    selectedTask,
    selectedTaskBelongToList,
    setSelectedTask,
    activeInputTaskTitle,
    setActiveInputTaskTitle,
    inputTaskTitle,
    setInputTaskTitle,
    updateTaskTitle,
    activeTextarea,
    setActiveTextarea,
    textareaValue,
    setTextareaValue,
    updateTaskDescription,
    updateTaskCover,
    addAttachment,
    showHideTaskMembersMenu,
    showTaskMembers,
    setShowTaskMembers,
    boardMembersRef,
    showBoardMembers,
    setShowBoardMembers,
    selectedItem,
    setSelectedItem,
    assignMemberToTask,
    removeMemberFromTask,
    searchedMembers,
    cleanSearchedMembers,
    onSearchedMembers,
    showLabels,
    labelModalRef,
    setShowLabels,
    labelData,
    setLabelData,
    addNewLabel,
    alertRef,
    removeLabel,
    user,
    addNewComment,
    removeComment,
    comments,
    attachments,
    deleteAttachment,
  } = useTask();

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
                <Image
                  loader={loaderCover}
                  src="cover"
                  alt="cover"
                  layout="fill"
                  objectFit="cover"
                />
              </ImageContainer>
            ) : (
              <ImageContainer>
                <Image
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
                <FieldContent flexDirection="column">
                  {/* HANDLE ASSIGN MEMBERS */}
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
                    <>
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
                            onActionClick={assignMemberToTask}
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
                    </>
                  )}
                  {/* HANDLE LABELS */}
                  <ActionLabels>
                    <Button
                      type="button"
                      width="150px"
                      textColor="grey"
                      bkgColor={colors.grey}
                      flexStar
                      onClick={() => setShowLabels(true)}
                    >
                      <MdOutlineLabelImportant size={20} />
                      Labels
                    </Button>
                    {showLabels && (
                      <CardModalContainer
                        cardRef={labelModalRef}
                        title="Labels"
                        subTitle="Select a name and a color"
                        btnText="Add"
                        width="260px"
                        showFloatIcon
                        iconTop="10px"
                        iconRight="10px"
                        onIconClick={() => {
                          setShowLabels(false);
                          setLabelData({
                            color: "",
                            value: "",
                          });
                        }}
                        onActionClick={addNewLabel}
                      >
                        <InputGroup>
                          <input
                            type="text"
                            placeholder="Label name"
                            value={labelData.value}
                            onChange={(e) => {
                              const value = sanitizeHTML(e.target.value, {
                                allowedTags: [],
                                allowedAttributes: {},
                              });
                              setLabelData({
                                ...labelData,
                                value,
                              });
                            }}
                          />
                          {labelData.value && (
                            <MdClear
                              size={20}
                              onClick={() =>
                                setLabelData({
                                  color: "",
                                  value: "",
                                })
                              }
                            />
                          )}
                        </InputGroup>
                        <BlockColors
                          getColor={(color) =>
                            setLabelData({ ...labelData, color })
                          }
                        />
                        {labelData.value && labelData.color && (
                          <>
                            <h4>Preview</h4>
                            <LabelTask
                              title={labelData.value}
                              color={labelData.color}
                            />
                          </>
                        )}
                        <Alert ref={alertRef} />
                        <FieldHeader>
                          <p>
                            <MdOutlineLabelImportant /> Availables
                          </p>
                        </FieldHeader>
                        <FieldContent>
                          {selectedTask.labels.map((label) => (
                            <LabelTask
                              key={label._id}
                              title={label.title}
                              color={label.color}
                              showAction
                              onClick={() => removeLabel(label._id)}
                            />
                          ))}
                        </FieldContent>
                      </CardModalContainer>
                    )}
                  </ActionLabels>
                  {/* HANDLE COVER */}
                  <InputCover>
                    <MdImage size={20} /> Cover
                    <input
                      type="file"
                      accept="images/*"
                      onChange={(e) => updateTaskCover(e)}
                    />
                  </InputCover>
                  {/* HANDLE ATTACHMENT */}
                  <InputCover>
                    <MdOutlineAttachFile size={20} /> Attachments
                    <input type="file" onChange={(e) => addAttachment(e)} />
                  </InputCover>
                </FieldContent>
              </Actions>
              <Content>
                <Header>
                  <SpaceBetweenContainer>
                    <TaskTitleInput
                      type="text"
                      value={inputTaskTitle}
                      readOnly={!activeInputTaskTitle}
                      onChange={(e) => {
                        const value = sanitizeHTML(e.target.value, {
                          allowedTags: [],
                          allowedAttributes: {},
                        });
                        setInputTaskTitle(value);
                      }}
                    />
                    {activeInputTaskTitle ? (
                      <FieldContentAction noContentActionMargin>
                        <Button
                          type="button"
                          bkgColor={colors.grey}
                          textColor="black"
                          onClick={() => {
                            setActiveInputTaskTitle(false);
                            setTextareaValue(selectedTask.title || "");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          bkgColor={colors.green}
                          onClick={() => {
                            setActiveInputTaskTitle(false);
                            updateTaskTitle(
                              inputTaskTitle || selectedTask.title
                            );
                          }}
                        >
                          Save
                        </Button>
                      </FieldContentAction>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setActiveInputTaskTitle(true)}
                      >
                        <MdMode />
                        Edit
                      </Button>
                    )}
                  </SpaceBetweenContainer>
                  <p>
                    In list <strong>{selectedTaskBelongToList}</strong>
                  </p>
                </Header>
                {/* TASK DESCRIPTION */}
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
                <FieldContent disabled={activeTextarea} flexDirection="column">
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
                    <FieldContentAction>
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
                          updateTaskDescription(textareaValue);
                        }}
                      >
                        Save
                      </Button>
                    </FieldContentAction>
                  )}
                </FieldContent>
                {/* TASK ATTACHMENTS */}
                {attachments.length > 0 && (
                  <>
                    <FieldHeader>
                      <p>
                        <BsChatFill /> Attachments
                      </p>
                    </FieldHeader>
                    <FieldContent>
                      <Attachments
                        attachments={attachments}
                        onDelete={({ id, imageId }) =>
                          deleteAttachment(id, imageId)
                        }
                      />
                    </FieldContent>
                  </>
                )}
                {/* TASK COMMENTS */}
                <FieldHeader>
                  <p>
                    <MdChat /> Comments
                  </p>
                </FieldHeader>
                <FieldContent>
                  <CommentBox
                    user={user}
                    onClick={({ comment }) => addNewComment(comment)}
                  />
                  <Comments comments={comments} removeComment={removeComment} />
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
  noContentActionMargin?: boolean;
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
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
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

const TaskMembers = styled.div`
  max-height: 300px;
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

const ActionLabels = styled.div`
  position: relative;
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
`;

const TaskTitleInput = styled.input`
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  outline: none;
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
    gap: 4px;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.2);
  }
`;

const FieldContent = styled.div<SProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection === "column" ? "column" : "row"};
  justify-content: ${(props) => (props.actionFlexEnd ? "flex-end" : "none")};
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
  textarea:nth-child(1) {
    padding: 8px;
    border: ${(props) =>
      props.disabled ? "none" : "1px solid rgba(0,0,0,0.3)"};
    border-radius: 10px;
    resize: none;
    outline: none;
  }
`;

const FieldContentAction = styled.div<SProps>`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: ${(props) => (props.noContentActionMargin ? "0px" : "10px")};
`;
