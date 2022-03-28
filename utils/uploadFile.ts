export const uploadFile = (
  e: any,
  limitSize: number = 100000,
  cb: (
    exceed: boolean,
    reader: FileReader | null,
    formData: FormData | null
  ) => void
) => {
  let formData: null | FormData = null;
  let reader: null | FileReader = null;
  const target = e.target as HTMLInputElement;
  const files = target.files as FileList;
  const exceed = files[0].size > limitSize;
  const typeFile = files[0].type.includes("image");
  if (files && files[0].size) {
    if (exceed) {
      cb(exceed, null, null);
      return;
    }
    formData = new FormData();
    formData.append("file", files[0]);
    if (typeFile) {
      formData.append("fileType", "image");
    } else {
      formData.append("fileType", "file");
    }
    reader = new FileReader();
    reader.readAsDataURL(files[0]);
    cb(false, reader, formData);
  }
};
