import React, { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
// Providers
import { MdImage, MdLock, MdLockOpen, MdAdd } from "react-icons/md";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import sanitizeHTML from "sanitize-html";
// Models
import { TBoardForm, BoardSchema, TBoard } from "@models/board";
// Main hook
import { useModalNewBoard } from "@utils/hook/useModalNewBoard";
// Default image
import DefaultImg from "@public/Logo.svg";
// Components
import { Button } from "@styles/common/Button";
import styled from "styled-components";
import { InputFile, InputGroup } from "@styles/common/Input";
import { colors } from "@styles/variables";
import { Alert } from "@styles/common/Alert";

interface Props {
  onClose: () => void;
}

export const BoardModal = ({ onClose }: Props) => {
  // MAIN HOOK
  const {
    onCreateBoard,
    handleIsPublic,
    setIsPublic,
    isPublic,
    tempAvatar,
    formDataRef,
    setTempAvatar,
    setAvatar,
    error,
    disabled,
  } = useModalNewBoard(onClose);

  //******** STATES ********//
  // Form states
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TBoardForm>({ resolver: joiResolver(BoardSchema) });

  //******** RENDERS ********//
  return (
    <Container>
      <ImageContainer>
        {tempAvatar ? (
          <ImageNext
            src={tempAvatar}
            alt="default"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <ImageNext
            src={DefaultImg}
            alt="default"
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
      </ImageContainer>
      <form onSubmit={handleSubmit(onCreateBoard)}>
        <InputGroup disabled={disabled}>
          <input
            disabled={disabled}
            type="text"
            placeholder="Add board title"
            onChange={(e) => {
              const value = sanitizeHTML(e.target.value, {
                allowedTags: [],
                allowedAttributes: {},
              });
              setValue("title", value);
            }}
          />
        </InputGroup>
        {errors.title && <Alert>{errors.title.message}</Alert>}
        <InputButtons>
          <InputFile isButton bkgColor={colors.grey} textColor="grey">
            <MdImage size={20} />
            Cover
            <input
              type="file"
              accept="images/*"
              onChange={(e) => {
                setAvatar(e);
              }}
            />
          </InputFile>
          {isPublic ? (
            <Button
              type="button"
              bkgColor={colors.green}
              fullWidth
              onClick={handleIsPublic}
            >
              <MdLockOpen size={15} />
              Public
            </Button>
          ) : (
            <Button
              type="button"
              bkgColor={colors.alert}
              fullWidth
              onClick={handleIsPublic}
            >
              <MdLock size={15} />
              Private
            </Button>
          )}
        </InputButtons>
        <ActionButton>
          <Button
            type="button"
            bkgColor={colors.grey}
            textColor="grey"
            onClick={() => {
              onClose();
              setTempAvatar("");
              setIsPublic(false);
              setValue("title", "");
              formDataRef.current = undefined;
              reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">
            <MdAdd size={15} />
            Create
          </Button>
        </ActionButton>
        {error && <Alert>{error}</Alert>}
      </form>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  position: absolute;
  top: 150px;
  left: calc(50% - 150px);
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 3;
  transform: translateY(0%);
`;

const ImageContainer = styled.div`
  height: 100px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 10px;
`;

const InputButtons = styled.div`
  display: flex;
  gap: 70px;
  margin-bottom: 10px;
`;

const ActionButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ImageNext = styled(Image)`
  border-radius: 5px;
`;
