import React, { useEffect, useState } from "react";
import Image from "next/image";
// Providers
import styled from "styled-components";
import sanitizeHTML from "sanitize-html";
// Models
import { TUser } from "@models/user";
// Components & styled components
import { Members } from "@components/common/members";
import { Button } from "@styles/common/Button";

interface Props {
  user: TUser;
  onClick: ({ comment }: { comment: string }) => void;
}

export const CommentBox = ({ user, onClick }: Props) => {
  const [comment, setComment] = useState("");

  return (
    <Container>
      <Content>
        <div>
          <Members user={user} />
        </div>
        <Textarea
          placeholder="Write a comment..."
          rows={3}
          value={comment}
          onChange={(e) => {
            const value = sanitizeHTML(e.target.value, {
              allowedTags: [],
              allowedAttributes: {},
            });
            setComment(value);
          }}
        ></Textarea>
      </Content>
      <Action>
        <Button
          type="button"
          onClick={() => {
            onClick({ comment });
            setComment("");
          }}
        >
          Comment
        </Button>
      </Action>
    </Container>
  );
};

//******* STYLES ********//

const Container = styled.div`
  width: 100%;
  padding: 8px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Content = styled.div`
  display: flex;
  margin-bottom: 5px;
  gap: 5px;
`;

const Textarea = styled.textarea`
  padding-top: 6px;
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const Action = styled.div`
  display: flex;
  justify-content: flex-end;
`;
