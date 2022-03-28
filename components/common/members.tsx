import React from "react";
import Image from "next/image";
// Providers
import styled from "styled-components";
// Models
import { TUser } from "@models/user";
// Images
import DefaultImgUser from "@public/favicon.ico";

interface Props {
  user: TUser;
  width?: number;
  height?: number;
}

export const Members = ({ user, width = 30, height = 30 }: Props) => {
  //******** METHODS ********//
  // Load image by URL
  const myLoaderAvatar = () => {
    return user.avatar;
  };

  return (
    <>
      {user.avatar ? (
        <ImageNext
          src="avatar"
          loader={myLoaderAvatar}
          alt="default"
          width={width}
          height={height}
          objectFit="cover"
        />
      ) : (
        <ImageNext
          src={DefaultImgUser}
          alt="default"
          width={width}
          height={height}
          priority
          objectFit="cover"
        />
      )}
    </>
  );
};

const ImageNext = styled(Image)`
  border-radius: 5px;
`;
