import { createContext, useState } from "react";
// Models
import { TUser } from "@models/user";

interface IUserStates {
  user: TUser;
}

interface IUserProps {
  states: IUserStates;
  setUser: (user: TUser) => void;
  clearUser: () => void;
}

export const UserContext = createContext({} as IUserProps);

export const UserProvider: React.FC = ({ children }) => {
  const [states, setStates] = useState<IUserStates>({
    user: {
      avatar: "",
      avatarId: "",
      email: "",
      _id: "",
      lastname: "",
      name: "",
      username: "",
      completeName: "",
    },
  });

  const setUser = (user: TUser) => {
    setStates({ user });
  };

  const clearUser = () => {
    setStates({
      user: {
        avatar: "",
        avatarId: "",
        email: "",
        _id: "",
        lastname: "",
        name: "",
        username: "",
        completeName: "",
      },
    });
  };

  return (
    <UserContext.Provider value={{ states, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
