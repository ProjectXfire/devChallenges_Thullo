import { ChangeEvent, useContext, useRef, useState } from "react";
// Providers
import { toast } from "react-toastify";
// Models
import { TBoardForm } from "@models/board";
// Services
import { createBoardReq } from "@services/app/board";
// Context
import { BoardContext } from "@utils/context/board/BoardContext";
// Utils
import { uploadFile } from "@utils/uploadFile";

export const useModal = (
  baseUrl: string,
  onClose: () => void,
  token: string
) => {
  //******** VARIABLES ********//
  const formDataRef = useRef<FormData>();

  //******** CONTEXT ********//
  // Board context
  const { setBoard } = useContext(BoardContext);

  //******** STATES ********//
  // Handle error on request
  const [error, setError] = useState("");
  // Handle disable inputs on request
  const [disabled, setDisabled] = useState(false);
  // Handle public or private
  const [isPublic, setIsPublic] = useState(false);
  // Handle selected avatar
  const [tempAvatar, setTempAvatar] = useState<string>("");

  //******** METHODS ********//
  // New board
  const onCreateBoard = async (inputsData: TBoardForm, e: any) => {
    const formData = formDataRef.current;
    try {
      if (formData && formData.get("file")) {
        formData.append("title", inputsData.title);
        formData.append("isPublic", `${isPublic}`);
        setDisabled(true);
        const board = await createBoardReq(baseUrl, token, formData);
        setBoard(board);
        setDisabled(false);
        onClose();
        e.target.reset();
        formData.append("title", "");
        formData.append("isPublic", "");
        formData.append("file", "");
        formDataRef.current = undefined;
        setTempAvatar("");
        setIsPublic(false);
      }
    } catch (error: any) {
      setDisabled(false);
      setError(error.message);
    }
  };
  // Handle public or private
  const handleIsPublic = () => {
    setIsPublic((value) => !value);
  };
  // Handle change avatar
  const setAvatar = (e: ChangeEvent<HTMLInputElement>) => {
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

  return {
    onCreateBoard,
    handleIsPublic,
    setIsPublic,
    isPublic,
    setAvatar,
    setTempAvatar,
    formDataRef,
    tempAvatar,
    disabled,
    error,
  };
};
