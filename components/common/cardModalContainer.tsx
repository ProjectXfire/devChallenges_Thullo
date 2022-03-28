import React from "react";
// Providers
import styled from "styled-components";
import { MdClear } from "react-icons/md";
// Components & styled components
import { Button } from "@styles/common/Button";
import { colors } from "@styles/variables";
import { FloatIcon } from "@components/common/floatIcon";

interface Props {
  cardRef?: React.RefObject<HTMLDivElement>;
  title?: string;
  subTitle?: string;
  btnText?: string;
  children: React.ReactNode;
  iconRight: string;
  iconTop: string;
  showFloatIcon?: boolean;
  width?: string;
  onActionClick: () => void;
  onIconClick?: () => void;
}

export const CardModalContainer = ({
  cardRef,
  title,
  subTitle,
  children,
  iconRight,
  iconTop,
  btnText,
  showFloatIcon,
  width,
  onActionClick,
  onIconClick,
}: Props) => {
  return (
    <Container ref={cardRef} width={width}>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      {children}
      {showFloatIcon && (
        <FloatIcon
          iconBkgColor={colors.alertLight}
          onClick={onIconClick}
          iconRight={iconRight}
          iconTop={iconTop}
        >
          <MdClear size={15} color={colors.alert} />
        </FloatIcon>
      )}

      <Button
        type="button"
        bkgColor={colors.lightBlue}
        textColor={colors.blue}
        onClick={onActionClick}
      >
        {btnText}
      </Button>
    </Container>
  );
};

interface SProps {
  width?: string;
}

const Container = styled.div<SProps>`
  width: ${(props) => (props.width ? props.width : "auto")};
  padding: 10px;
  top: 40px;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: white;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 3;
  button {
    align-self: center;
  }
`;

const Title = styled.h3`
  margin-top: 10px;
  margin-bottom: 5px;
`;

const SubTitle = styled.p`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
`;
