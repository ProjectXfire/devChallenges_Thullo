import { useRouter } from "next/router";
import { useState } from "react";
// Models
import { UserRegisterDto } from "@models/user";
// Services
import { registerReq } from "@services/app/user";

export const useRegister = () => {
  //******** VARAIBLES ********//
  const router = useRouter();

  //******** STATES ********//
  // Handle error on request
  const [error, setError] = useState("");
  // Handle disable inputs on request
  const [disabled, setDisabled] = useState(false);

  //******** METHODS ********//
  // Register new user
  const onRegister = async (data: UserRegisterDto, e: any) => {
    try {
      const newUser = {
        ...data,
        avatar: "",
        avatarId: "",
      };
      setDisabled(true);
      await registerReq(newUser);
      setDisabled(false);
      e.target.reset();
      router.push("/login");
    } catch (error: any) {
      setDisabled(false);
      setError(error.message);
    }
  };

  //******** RETURN STATES AND METHODS ********//
  return {
    onRegister,
    error,
    disabled,
  };
};
