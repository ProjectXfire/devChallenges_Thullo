import React from "react";
// Providers
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import { Button } from "@styles/common/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  openRenameMenu: () => void;
  onDelete: () => void;
  tasksListRef: React.RefObject<HTMLDivElement>;
}

export const TasksListMenu = ({
  open,
  onClose,
  tasksListRef,
  onDelete,
  openRenameMenu,
}: Props) => {
  return (
    <Container ref={tasksListRef} open={open}>
      <Button
        type="button"
        bkgColor="transparent"
        textColor="grey"
        onClick={openRenameMenu}
      >
        Rename
      </Button>
      <span></span>
      <Button
        type="button"
        bkgColor="transparent"
        textColor="grey"
        onClick={onDelete}
      >
        Remove
      </Button>
      <MdOutlineClose onClick={onClose} />
    </Container>
  );
};

interface SProps {
  open?: boolean;
}

const Container = styled.div<SProps>`
  display: ${(props) => (props.open ? "block" : "none")};
  width: 100px;
  padding-top: 18px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  top: 45px;
  right: 5px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  background-color: white;
  border-radius: 5px;
  font-weight: lighter;
  font-size: 0.9rem;

  svg {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
  span {
    display: block;
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.1);
    margin: 5px 0;
  }
`;
