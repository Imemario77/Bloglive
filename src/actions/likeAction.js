import { likeBlog } from "../apiCall/blogApi";

export const likeBlogAction = async (formData) => {
  try {
    const data = await likeBlog(formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
