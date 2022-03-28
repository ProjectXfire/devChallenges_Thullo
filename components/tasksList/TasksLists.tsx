import React from "react";
// Providers
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
// Models
import { TTasksList } from "@models/tasksList";
import { TBoard } from "@models/board";
// Hooks
import { useTasksList } from "@utils/hook/useTasksList";
// Components & styled components
import { Button } from "@styles/common/Button";
import { colors } from "@styles/variables";
import { AddTasksListMenu } from "@components/tasksList/AddTasksListMenu";
import { TasksList } from "@components/tasksList/TasksList";

interface Props {
  board: TBoard;
  tasksList: TTasksList[];
}

export const TasksLists = ({ board, tasksList }: Props) => {
  //******* TASKS LIST HOOK ********//
  const {
    isBrowser,
    tasksListByBoard,
    onDragEnd,
    addTasksListMenuRef,
    showAddTasksListMenu,
    setShowAddTasksListMenu,
    addNewTasksList,
  } = useTasksList({ board, tasksList });

  return (
    <>
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
                      tasksListIndex={index}
                    />
                  );
                })}
                {provided.placeholder}
              </TasksListContainer>
            )}
          </Droppable>
        </DragDropContext>
      ) : null}
    </>
  );
};

//******** STYLES ********//

const TasksListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;
