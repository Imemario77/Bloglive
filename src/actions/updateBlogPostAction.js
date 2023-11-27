import { updateBlogPost } from "../apiCall/blogApi";

export const UpdateUserSpecificBlogPost = async (formData) => {
  try {
    const { data } = await updateBlogPost(formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
