import React from "react";
// Providers
import styled from "styled-components";
import { MdClose } from "react-icons/md";
// Models
import { TComment } from "@models/comment";
// Utils
import { formattingDate2 } from "@utils/dateFormat";
// Components & styled components
import { Members } from "@components/common/members";
import { FloatIcon } from "@components/common/floatIcon";
import { Separator } from "@styles/common/Separator";
import { colors } from "@styles/variables";

interface Props {
  comments: TComment[];
  removeComment: (commentId: string, createdBy: string) => Promise<void>;
}

export const Comments = ({ comments, removeComment }: Props) => {
  return (
    <Container>
      {comments.map((comment, index) => (
        <CommentContainer key={comment._id}>
          {index > 0 && <Separator />}
          <CreatedBy>
            <AvatarContainer>
              <Members width={35} height={35} user={comment.createdBy} />
            </AvatarContainer>
            <UserDetail>
              <p>{comment.createdBy.name + " " + comment.createdBy.lastname}</p>
              <p>{formattingDate2(comment.createdAt)}</p>
            </UserDetail>
            <FloatIcon
              iconRight="15px"
              iconTop="5px"
              iconBkgColor={colors.alert}
              onClick={() => removeComment(comment._id, comment.createdBy._id)}
            >
              <MdClose color="white" />
            </FloatIcon>
          </CreatedBy>
          <Comment>{comment.comment}</Comment>
        </CommentContainer>
      ))}
    </Container>
  );
};

//******** STYLES ********//
const Container = styled.div`
  width: 100%;
  max-height: 400px;
  margin-top: 8px;
  font-size: 0.9rem;
  overflow: auto;
`;

const CommentContainer = styled.div`
  margin-bottom: 16px;
`;

const CreatedBy = styled.div`
  position: relative;
  margin-bottom: 6px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserDetail = styled.div`
  p:nth-child(2) {
    color: rgba(0, 0, 0, 0.3);
    font-size: 0.7rem;
  }
`;

const Comment = styled.p``;
