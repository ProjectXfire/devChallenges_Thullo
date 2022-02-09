import { Button } from "@styles/common/Button";
import { colors } from "@styles/variables";
import React from "react";
// Providers
import styled from "styled-components";
import { IoTrashOutline, IoCloseCircle } from "react-icons/io5";

interface Props {
  itemText: string;
  onCancel: () => void;
  onDelete: () => void;
}

export const DeleteModal = ({ itemText, onCancel, onDelete }: Props) => {
  return (
    <Container>
      <Text>
        Are you sure to delete <strong>{itemText}</strong>?
      </Text>
      <Actions>
        <Button type="button" onClick={onCancel}>
          <IoCloseCircle size={15} />
          Cancel
        </Button>
        <Button bkgColor={colors.alert} type="button" onClick={onDelete}>
          <IoTrashOutline size={15} /> Delete
        </Button>
      </Actions>
    </Container>
  );
};

//******** STYLES ********//

const Container = styled.div`
  width: 200px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 15px;
  position: absolute;
  top: 0px;
  left: calc(50% - 100px);
  z-index: 3;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  margin: 20px 0;
  font-size: 0.9rem;
  strong {
    color: red;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;
