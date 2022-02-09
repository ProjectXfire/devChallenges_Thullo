import { v4 as uuidv4 } from "uuid";

export const uploadFile = (
  e: any,
  cb: (
    typeFile: boolean,
    exceed: boolean,
    reader: FileReader | null,
    formData: FormData | null
  ) => void
) => {
  let formData: null | FormData = null;
  let reader: null | FileReader = null;
  const target = e.target as HTMLInputElement;
  const files = target.files as FileList;
  const typeFile = files[0].type.includes("image");
  const exceed = files[0].size > 100000;
  if (files && files[0].size) {
    if (!typeFile) {
      cb(true, false, null, null);
      return;
    }
    if (exceed) {
      cb(false, exceed, null, null);
      return;
    }
    formData = new FormData();
    formData.append("file", files[0]);
    reader = new FileReader();
    reader.readAsDataURL(files[0]);
    cb(false, false, reader, formData);
  }
};
