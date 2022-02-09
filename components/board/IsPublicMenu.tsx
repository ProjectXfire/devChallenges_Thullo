import React from "react";
// Providers
import styled from "styled-components";
import { MdLock, MdPublic } from "react-icons/md";
// Styles
import { colors } from "@styles/variables";

interface Props {
  isPublicMenuRef: React.RefObject<HTMLDivElement>;
  showIsPublicMenu: boolean;
  isPublic: boolean;
  updateIsPublic: (value: boolean) => void;
}

export const PublicPrivateMenu = ({
  isPublicMenuRef,
  showIsPublicMenu,
  isPublic,
  updateIsPublic,
}: Props) => {
  return (
    <IsPublicMenu ref={isPublicMenuRef} isIsPublicMenuActive={showIsPublicMenu}>
      <p>Visibility</p>
      <p>Choose who can see this board</p>
      <IsPublicOptions
        isPublic={isPublic === true}
        onClick={() => updateIsPublic(true)}
      >
        <div>
          <MdPublic />
          Public
        </div>
        <span>Anyone can see this</span>
      </IsPublicOptions>
      <IsPublicOptions
        isPublic={isPublic === false}
        onClick={() => updateIsPublic(false)}
      >
        <div>
          <MdLock />
          Private
        </div>
        <span>Only board members can see this</span>
      </IsPublicOptions>
    </IsPublicMenu>
  );
};

//******** STYLES ********//

interface SProps {
  isPublic?: boolean;
  isIsPublicMenuActive?: boolean;
}

const IsPublicMenu = styled.div<SProps>`
  display: ${(props) => (props.isIsPublicMenuActive ? "block" : "none")};
  position: absolute;
  padding: 8px;
  top: 35px;
  background-color: white;
  z-index: 1;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  z-index: 2;
  p:nth-child(1) {
    font-weight: bold;
  }
  p:nth-child(2) {
    color: rgba(0, 0, 0, 0.3);
  }
`;

const IsPublicOptions = styled.div<SProps>`
  background-color: ${(props) => (props.isPublic ? colors.grey : "white")};
  margin-top: 15px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;
  }
`;
