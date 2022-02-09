// Providers
import { toast } from "react-toastify";
// Models
import { TUser, UserUpdateDto } from "@models/user";
// Services
import { updateUserReq, updateUserFormDataReq } from "@services/app/user";
// User context
import { UserContext } from "@utils/context/user/UserContext";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
// Utils
import { uploadFile } from "@utils/uploadFile";

export const useProfile = (data: TUser) => {
  //******** CONTEXT  ********//
  // User
  const { setUser } = useContext(UserContext);

  //******** VARAIBLES ********//
  const router = useRouter();
  const formDataRef = useRef<FormData>();

  //******** STATES ********//
  // Handle error on request
  const [error, setError] = useState("");
  // Handle disable inputs on request
  const [disabled, setDisabled] = useState(false);
  // Handle selected avatar
  const [tempAvatar, setTempAvatar] = useState<string>("");

  //******** METHODS ********//
  // Register new user
  const onUpdate = async (inputsData: UserUpdateDto, e: any) => {
    setError("");
    const formData = formDataRef.current;
    try {
      setDisabled(true);
      if (formData) {
        formData.append("username", inputsData.username);
        formData.append("name", inputsData.name);
        formData.append("lastname", inputsData.lastname);
        formData.append("avatarId", data.avatarId);
        await updateUserFormDataReq(formData);
      } else {
        const payload = {
          ...inputsData,
          avatar: data.avatar,
          avatarId: data.avatarId,
        };
        await updateUserReq(payload);
      }
      setDisabled(false);
      e.target.reset();
      router.push("/profile");
    } catch (error: any) {
      setDisabled(false);
      setError(error.message);
    }
  };

  // Handle change avatar
  const changeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    uploadFile(e, (fileType, exceed, reader, formData) => {
      if (fileType) {
        toast.error("The file must be an image");
        return;
      }
      if (exceed) {
        toast.error("The file must not exceed the 100kb");
        return;
      }
      if (reader && formData) {
        formDataRef.current = formData;
        reader.onload = (e) => {
          if (typeof reader.result === "string") {
            setTempAvatar(reader.result);
          }
        };
      }
    });
  };

  useEffect(() => {
    setUser(data);
  }, []);

  //******** RETURN STATES AND METHODS ********//
  return {
    onUpdate,
    error,
    disabled,
    tempAvatar,
    changeAvatar,
  };
};
