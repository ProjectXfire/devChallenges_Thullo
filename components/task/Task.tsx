import React, { useContext, useState } from "react";
import Image from "next/image";
// Providers
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { MdMode, MdClear, MdOutlineAttachFile, MdChat } from "react-icons/md";

// Models
import { TTask } from "@models/task";
// Context
import { TaskContext } from "@utils/context/Task/TaskContext";
// Default image
import TaskCoverTemplate from "@public/tasktemplate.jpg";
// Components & Styled components
import { colors } from "@styles/variables";
import { Background } from "@styles/common/Background";
import { DeleteModal } from "@components/common/deleteModal";
import { FloatIcon } from "@components/common/floatIcon";
import { LabelTask } from "@components/common/labelTask";
import { Members } from "@components/common/members";

interface Props {
  task: TTask;
  index: number;
  inTasksList: string;
  onDelete: (taskId: string) => void;
}

export const Task = ({ task, index, inTasksList, onDelete }: Props) => {
  //******** CONTEXT ********//
  // Task
  const { setSelectedTask } = useContext(TaskContext);

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
          <FloatIcon
            iconTop="2px"
            iconRight="2px"
            iconBkgColor={colors.alertLight}
            onClick={() => setShowDeleteModal(true)}
          >
            <MdClear size={15} color={colors.alert} />
          </FloatIcon>
          <FloatIcon
            iconTop="30px"
            iconRight="2px"
            iconBkgColor={colors.lightBlue}
            onClick={setTask}
          >
            <MdMode size={15} color={colors.blue} />
          </FloatIcon>
          {task.cover ? (
            <ImageContainer>
              <Image
                src="cover-task"
                loader={loaderImage}
                layout="fill"
                alt="cover-task"
                objectFit="cover"
                priority
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
          <LabelsContainer>
            {task.labels.map((label) => (
              <LabelTask
                key={label._id}
                title={label.title}
                color={label.color}
              />
            ))}
          </LabelsContainer>
          <ResponsablesCountContainer>
            <ResponsablesContainer>
              {task.members.map((user) => (
                <Members user={user} key={user._id} />
              ))}
            </ResponsablesContainer>
            <CountContainer>
              {task.countAttachments > 0 && (
                <CountItems>
                  <MdOutlineAttachFile size={15} />
                  {task.countAttachments}
                </CountItems>
              )}
              {task.countComments > 0 && (
                <CountItems>
                  <MdChat size={15} /> {task.countComments}
                </CountItems>
              )}
            </CountContainer>
          </ResponsablesCountContainer>
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

const Title = styled.p`
  margin: 8px 0px;
  color: ${colors.blue};
  font-weight: bold;
`;

const LabelsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const ResponsablesCountContainer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
`;

const ResponsablesContainer = styled.div`
  width: 100%;
  display: flex;
`;

const CountContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const CountItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.2);
`;
