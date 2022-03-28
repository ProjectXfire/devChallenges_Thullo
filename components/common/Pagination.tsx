import React, { useState } from "react";
// Providers
import Paged from "rc-pagination";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { colors } from "@styles/variables";
import styled from "styled-components";

interface Props {
  currentPage: number;
  totalDocuments: number;
  documentsPerPage: number;
  onChange: (page: number) => void;
}

export const Pagination = ({
  totalDocuments,
  currentPage,
  documentsPerPage,
  onChange,
}: Props) => {
  return (
    <Container>
      <Paged
        simple
        defaultCurrent={currentPage}
        current={currentPage}
        total={totalDocuments}
        pageSize={documentsPerPage}
        nextIcon={<MdNavigateNext size={25} color={colors.darkblue} />}
        prevIcon={<MdNavigateBefore size={25} color={colors.darkblue} />}
        onChange={(page) => onChange(page)}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 20px;
`;
