import { uploadFile } from "../apiCall/blogApi";


// uplopad files
export async function uploadFileAction(file) {
  try {
    const  data  = await uploadFile(file);
    return data;
  } catch (error) {
    alert(error.message)
    console.log(error);
  }
}
