import React from "react";
import Image from "next/image";
// Models
import { TAttachment } from "@models/attachment";
// Providers
import styled from "styled-components";
// Utils
import { formattingDate3 } from "@utils/dateFormat";
// Components & styled components
import { colors, device } from "@styles/variables";
import { Button } from "@styles/common/Button";

interface Props {
  attachments: TAttachment[];
  onDelete: ({ id, imageId }: { id: string; imageId: string }) => void;
}

export const Attachments = ({ attachments, onDelete }: Props) => {
  const loaderImage = (src: string) => {
    return src;
  };

  const downloadImage = async (url: string, filename: string) => {
    const image = await fetch(url);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      {attachments.map((attachment) => (
        <AttachmentContainer key={attachment._id}>
          {attachment.file.length > 0 ? (
            <FileImage>File</FileImage>
          ) : (
            <ImageContainer>
              <Image
                src="image"
                alt="image"
                layout="fill"
                loader={() => loaderImage(attachment.imageURL)}
                objectFit="cover"
              />
            </ImageContainer>
          )}
          <FileData>
            <p>{formattingDate3(attachment.createdAt)}</p>
            <p>{attachment.originalname}</p>
            <FileAction>
              {attachment.file.length === 0 ? (
                <Button
                  type="button"
                  borderColor="grey"
                  bkgColor="white"
                  textColor="grey"
                  onClick={() =>
                    downloadImage(attachment.imageURL, attachment.originalname)
                  }
                >
                  Download
                </Button>
              ) : (
                <Button
                  type="button"
                  borderColor="grey"
                  bkgColor="white"
                  textColor="grey"
                >
                  <a
                    href={`data:${attachment.mimetype};base64,${attachment.file}`}
                    download={`${attachment.originalname}`}
                  >
                    Download
                  </a>
                </Button>
              )}
              <Button
                type="button"
                borderColor="grey"
                bkgColor="white"
                textColor="grey"
                onClick={() =>
                  onDelete({ id: attachment._id, imageId: attachment.imageId })
                }
              >
                Delete
              </Button>
            </FileAction>
          </FileData>
        </AttachmentContainer>
      ))}
    </Container>
  );
};

//******** STYLES ********//

const Container = styled.div`
  width: 100%;
  max-height: 300px;
  overflow: auto;
`;

const AttachmentContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const FileImage = styled.div`
  width: 80px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.grey};
  border-radius: 8px;
  font-size: 0.9rem;
  @media ${device.tablet} {
    width: 120px;
    height: 70px;
  }
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 50px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  @media ${device.tablet} {
    width: 120px;
    height: 70px;
  }
`;

const FileData = styled.div`
  font-size: 0.9rem;
  p:nth-child(1) {
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.2);
  }
  p:nth-child(2) {
    margin-bottom: 5px;
  }
`;
const FileAction = styled.div`
  display: flex;
  gap: 8px;
`;
