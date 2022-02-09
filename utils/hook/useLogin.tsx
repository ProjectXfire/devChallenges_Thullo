import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
// Models
import { UserLoginDto } from "@models/user";
// Services
import { loginReq } from "@services/app/auth";
// Context token
import { TokenContext } from "@utils/context/token/TokenContext";

export const useLogin = () => {
  //******** VARIABLES ********//
  const router = useRouter();

  //******* CONTEXTS ********//
  const { onGetToken } = useContext(TokenContext);

  //******** STATES ********//
  // Handle error on request
  const [error, setError] = useState("");
  // Handle disable inputs on request
  const [disabled, setDisabled] = useState(false);

  const onLogin = async (data: UserLoginDto, e: any) => {
    try {
      setDisabled(true);
      await loginReq(data);
      setDisabled(false);
      onGetToken();
      e.target.reset();
      router.push("/");
    } catch (error: any) {
      setDisabled(false);
      setError(error.message);
    }
  };
  return {
    onLogin,
    error,
    disabled,
  };
};
