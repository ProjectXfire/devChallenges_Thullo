import React, { createContext, useEffect, useState } from "react";
// Services
import { getToken } from "@services/token";

interface ITokenStates {
  token: string | undefined;
}

interface ITokenProps {
  states: ITokenStates;
  onGetToken: () => void;
  onRemoveToken: () => void;
}

export const TokenContext = createContext({} as ITokenProps);

export const TokenProvider: React.FC = ({ children }) => {
  const [states, setStates] = useState<ITokenStates>({
    token: undefined,
  });

  const onGetToken = () => {
    const token = getToken();
    setStates({
      token,
    });
  };

  const onRemoveToken = () => {
    setStates({ token: undefined });
  };

  useEffect(() => {
    onGetToken();
  }, [states.token]);

  return (
    <TokenContext.Provider value={{ states, onGetToken, onRemoveToken }}>
      {children}
    </TokenContext.Provider>
  );
};
