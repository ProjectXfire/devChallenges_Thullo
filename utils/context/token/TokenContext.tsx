import React, { createContext, useEffect, useState } from "react";
// Services
import { getToken } from "@services/token";

interface ITokenStates {
  isLogged: boolean;
}

interface ITokenProps {
  states: ITokenStates;
  onGetToken: () => void;
  onRemoveToken: () => void;
  verifyToken: () => void;
}

export const TokenContext = createContext({} as ITokenProps);

export const TokenProvider: React.FC = ({ children }) => {
  const [states, setStates] = useState<ITokenStates>({
    isLogged: false,
  });

  const onGetToken = () => {
    const token = getToken();
    setStates({
      isLogged: token ? true : false,
    });
  };

  const verifyToken = () => {
    return getToken();
  };

  const onRemoveToken = () => {
    setStates({ isLogged: false });
  };

  useEffect(() => {
    onGetToken();
  }, [states.isLogged]);

  return (
    <TokenContext.Provider
      value={{ states, onGetToken, onRemoveToken, verifyToken }}
    >
      {children}
    </TokenContext.Provider>
  );
};
