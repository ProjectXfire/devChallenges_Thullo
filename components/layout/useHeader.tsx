import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
// Services
import { removeToken } from "@services/token";
// Context
import { TokenContext } from "@utils/context/token/TokenContext";
import { UserContext } from "@utils/context/user/UserContext";

export const useHeader = () => {
  //******** VARIABLES *******//
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  //******** CONTEXT ********//
  // Token
  const {
    states: { isLogged },
    onRemoveToken,
  } = useContext(TokenContext);
  // User
  const {
    states: { user },
    clearUser,
  } = useContext(UserContext);

  //******** STATES ********//
  // Handle sidebar
  const [showSidebar, setShowSidebar] = useState(false);
  // Handle user options
  const [showUserOptions, setShowUserOptions] = useState(false);

  //******** METHODS ********//
  // Handle sidebar
  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  // Handle user options
  const handleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
  };
  // Go to profile
  const profile = () => {
    setShowSidebar(false);
    setShowUserOptions(false);
    router.push("/profile");
  };
  // Close session
  const onLogout = () => {
    onRemoveToken();
    removeToken();
    clearUser();
    setShowUserOptions(false);
    setShowSidebar(false);
    router.push("/login");
  };

  //******** EFFECTS ********//
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showUserOptions && !dropdownRef.current?.contains(e.target)) {
        setShowUserOptions(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showUserOptions]);

  return {
    dropdownRef,
    user,
    isLogged,
    handleSidebar,
    handleUserOptions,
    profile,
    onLogout,
    showUserOptions,
    showSidebar,
  };
};
