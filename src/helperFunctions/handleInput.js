// handle input file changes
export const handleFileChange = (event, image_name = "", setFileInfo) => {
  if (event.target.files && event.target.files[0]) {
    setFileInfo((prev) => {
      if (typeof prev === "object") {
        return { ...prev, image_name: event.target.files[0] };
      } else if (typeof prev === "string") {
        return event.target.files[0];
      }
    });
  }
};

export const handleFileUpload = async (file, file_Upload_name) => {
  // configuring the file for multer to use
  if (file) {
    const data = new FormData();
    const filename = Date.now() + file_Upload_name;
    data.append("name", filename);
    data.append("file", file);
    const info = { data, filename };
    return info;
  }
};


 //handle changes in the input
export  const handleInputChange = (event,setInfo) => {
    const { name, value } = event.target;
    setInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };
  