import React, { useEffect, useRef, useState } from "react";
// Providers
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
// Models
import { TTasksList } from "@models/tasksList";

import { TTask } from "@models/task";
// Components
import { Button } from "@styles/common/Button";
import { colors, device } from "@styles/variables";
import { Background } from "@styles/common/Background";
import { TasksListMenu } from "@components/tasksList/TasksListMenu";
import { Task } from "@components/task/Task";
import { InputTitle } from "@components/tasksList/InputTitle";
import { DeleteModal } from "@components/common/deleteModal";
import { useTaskList } from "@utils/hook/useTaskList";

interface Props {
  tasksList: TTasksList;
  tasksListIndex: number;
}

export const TasksList = ({ tasksList, tasksListIndex }: Props) => {
  const {
    newTaskRef,
    tasksListMenuRef,
    tastsListTitleMenuRef,
    showTasksListMenu,
    setShowTasksListMenu,
    showTasksListInput,
    setShowTasksListInput,
    showDeleteTasksListModal,
    setShowDeleteTasksListModal,
    inputTasksListValue,
    setInputTasksListValue,
    inputTaskValue,
    setInputTaskValue,
    showTaskInput,
    setShowTaskInput,
    updateTasksListTitle,
    deleteTasksList,
    addNewTask,
    deleteTask,
  } = useTaskList({ tasksList });

  return (
    <>
      <Draggable
        draggableId={tasksList._id}
        isDragDisabled={true}
        index={tasksListIndex}
      >
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Header {...provided.dragHandleProps}>
              {tasksList.title}
              <Button
                bkgColor={colors.greyVariant}
                textColor="black"
                onClick={() => setShowTasksListMenu(true)}
              >
                <BiDotsHorizontalRounded size={20} />
              </Button>
              <TasksListMenu
                open={showTasksListMenu}
                onClose={() => setShowTasksListMenu(false)}
                tasksListRef={tasksListMenuRef}
                openRenameMenu={() => {
                  setShowTasksListMenu(false);
                  setShowTasksListInput(true);
                }}
                onDelete={() => setShowDeleteTasksListModal(true)}
              />
              {showDeleteTasksListModal && (
                <DeleteModal
                  itemText={`${tasksList.title}`}
                  onCancel={() => setShowDeleteTasksListModal(false)}
                  onDelete={() => {
                    deleteTasksList(tasksList._id);
                  }}
                />
              )}
              {showTasksListInput && (
                <InputTitle
                  title="Rename"
                  placeholder="Board title"
                  top="50px"
                  inputRef={tastsListTitleMenuRef}
                  inputValue={inputTasksListValue}
                  setInputValue={setInputTasksListValue}
                  onCancel={() => setShowTasksListInput(false)}
                  onSave={() => {
                    updateTasksListTitle(
                      tasksList._id,
                      inputTasksListValue,
                      tasksListIndex
                    );
                    setShowTasksListInput(false);
                  }}
                />
              )}
            </Header>
            <Droppable droppableId={tasksList._id} type="task">
              {(provided, snapshot) => (
                <Tasks
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {tasksList.tasks.map((item, taskIndex) => {
                    const task = item as TTask;
                    return (
                      <Task
                        key={task._id}
                        task={task}
                        index={taskIndex}
                        inTasksList={tasksList.title}
                        onDelete={(taskId) =>
                          deleteTask(taskId, tasksList._id, tasksListIndex)
                        }
                      />
                    );
                  })}
                  {provided.placeholder}
                </Tasks>
              )}
            </Droppable>
            <Button
              type="button"
              spaceBetween
              onClick={() => setShowTaskInput(true)}
              bkgColor={colors.lightBlue}
              textColor={colors.blue}
            >
              Add task <MdAdd />
            </Button>
            {showTaskInput && (
              <InputTitle
                title="New task"
                placeholder="Task title"
                bottom="40px"
                inputRef={newTaskRef}
                inputValue={inputTaskValue}
                setInputValue={setInputTaskValue}
                onCancel={() => {
                  setInputTaskValue("");
                  setShowTaskInput(false);
                }}
                onSave={() => {
                  addNewTask(
                    tasksList._id,
                    tasksList.boardId,
                    inputTaskValue,
                    tasksListIndex
                  );
                  setInputTaskValue("");
                  setShowTaskInput(false);
                }}
              />
            )}
          </Container>
        )}
      </Draggable>
      {showDeleteTasksListModal && (
        <Background onClick={() => setShowDeleteTasksListModal(false)} />
      )}
    </>
  );
};

//******** STYLES ********//

interface SProps {
  isDraggingOver?: boolean;
}

const Container = styled.div`
  position: relative;
  width: 700px;
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    width: 330px;
  }
`;

const Header = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const Tasks = styled.div<SProps>`
  min-height: 100px;
  flex-grow: 1;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "#bfc9db" : "transparent"};
  border-radius: 10px;
  padding: 10px 2px;
`;
