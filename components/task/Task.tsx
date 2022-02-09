import React, { useContext, useState } from "react";
import Image from "next/image";
// Providers
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { MdMode, MdClear } from "react-icons/md";
// Models
import { TTask } from "@models/task";
// Context
import { BoardContext } from "@utils/context/board/BoardContext";
// Default image
import TaskCoverTemplate from "@public/tasktemplate.jpg";
// Components & Styled components
import { colors } from "@styles/variables";
import { Background } from "@styles/common/Background";
import { DeleteModal } from "@components/common/deleteModal";

interface Props {
  task: TTask;
  index: number;
  inTasksList: string;
  onDelete: (taskId: string) => void;
}

export const Task = ({ task, index, inTasksList, onDelete }: Props) => {
  //******** CONTEXT ********//
  // Board
  const { setSelectedTask } = useContext(BoardContext);

  //******** STATES ********//
  // Open or close delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //******** METHODS ********//
  // Set the task on the context
  const setTask = () => {
    setSelectedTask(task, inTasksList);
  };
  // Load url cover task image
  const loaderImage = () => {
    return task.cover;
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.dragHandleProps}
        >
          <RemoveIcon
            type="button"
            iconTop="2px"
            iconRight="2px"
            iconBkgColor={colors.alert}
            onClick={() => setShowDeleteModal(true)}
          >
            <MdClear size={15} color="white" />
          </RemoveIcon>
          <RemoveIcon
            type="button"
            iconTop="30px"
            iconRight="2px"
            iconBkgColor={colors.blue}
            onClick={setTask}
          >
            <MdMode size={15} color="white" />
          </RemoveIcon>

          {task.cover ? (
            <ImageContainer>
              <Image
                src="cover-task"
                loader={loaderImage}
                layout="fill"
                alt="cover-task"
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
          <Title>{task.title}</Title>
          {showDeleteModal && (
            <>
              <Background onClick={() => setShowDeleteModal(false)} />
              <DeleteModal
                itemText={task.title}
                onCancel={() => setShowDeleteModal(false)}
                onDelete={() => {
                  onDelete(task._id);
                  setShowDeleteModal(false);
                }}
              />
            </>
          )}
        </Container>
      )}
    </Draggable>
  );
};

//******** STYLES ********//

interface SProps {
  isDragging?: boolean;
  iconTop?: string;
  iconRight?: string;
  iconBkgColor?: string;
}

const Container = styled.div<SProps>`
  position: relative;
  min-height: 100px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid lightgray;
  background: ${(props) => (props.isDragging ? "#a8b1c1" : "white")};
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

const RemoveIcon = styled.button<SProps>`
  padding: 4px;
  display: flex;
  position: absolute;
  top: ${(props) => props.iconTop};
  right: ${(props) => props.iconRight};
  z-index: 1;
  background-color: white;
  border-radius: 50%;
  background-color: ${(props) =>
    props.iconBkgColor ? props.iconBkgColor : "black"};
  cursor: pointer;
  border: none;
  &:active {
    transform: scale(0.9);
  }
`;

const Title = styled.h3`
  margin: 8px 0px;
  color: ${colors.blue};
`;
