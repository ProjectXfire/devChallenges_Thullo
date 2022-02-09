import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// Providers
import styled from "styled-components";
// Models
import { TBoard } from "@models/board";
// Services
import { findUserInBoardReq } from "@services/app/board";
// Images
import DefaultImgBoard from "@public/Logo.svg";
// Components
import { Members } from "@components/common/members";

interface Props {
  board: TBoard;
  validateAccessToBoard: (boardId: string) => Promise<void>;
}

export const BoardCard = ({ board, validateAccessToBoard }: Props) => {
  //******** VARIABLES ********//
  const router = useRouter();

  //******** METHODS ********//
  // Load board cover
  const coverLoader = () => {
    return board.cover;
  };

  //******** RENDER ********//
  return (
    <Container onClick={() => validateAccessToBoard(board._id)}>
      <ImageContainer>
        {board.cover ? (
          <ImageNext
            src="cover"
            alt="default"
            layout="fill"
            objectFit="cover"
            loader={coverLoader}
            priority
          />
        ) : (
          <ImageNext
            src={DefaultImgBoard}
            alt="default"
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
      </ImageContainer>
      <h1>{board.title}</h1>
      <MembersContainer>
        {board.members.slice(0, 3).map((item) => (
          <Members key={item._id} user={item} />
        ))}
        {board.members.length > 3 && (
          <p>{`+${board.members.length - 3} others`}</p>
        )}
      </MembersContainer>
    </Container>
  );
};

//******** STYLES ********//
const Container = styled.article`
  padding: 18px;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ImageContainer = styled.div`
  height: 100px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const MembersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  p {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const ImageNext = styled(Image)`
  border-radius: 5px;
`;
