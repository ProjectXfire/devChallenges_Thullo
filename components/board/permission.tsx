import React, { useEffect, useState } from "react";
// Models
import { TPermission } from "@models/permission";
import styled from "styled-components";

interface Props {
  permission: TPermission;
  handleGrantedPermissions: (isGranted: boolean, permId: string) => void;
  exist: boolean;
}

export const Permission = ({
  permission,
  handleGrantedPermissions,
  exist,
}: Props) => {
  const [check, setCheck] = useState(exist);

  useEffect(() => {
    if (exist) {
      setCheck(true);
    }
  }, [exist]);

  return (
    <Container>
      <input
        type="checkbox"
        checked={check}
        onChange={() => {
          setCheck(!check);
          handleGrantedPermissions(!check, permission._id);
        }}
      />
      {permission.description}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
