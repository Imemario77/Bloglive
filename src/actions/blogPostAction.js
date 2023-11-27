import {
  createBlogPost,
  deleteBlogPost,
  getBlogPost,
  getSpecificBlogPost,
} from "../apiCall/blogApi";

export const createBlogPostAction = async (formData) => {
  try {
    const { data } = await createBlogPost(formData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogPost = async () => {
  try {
    const { data } = await getBlogPost();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserSpecificBlogPost = async (blogId) => {
  try {
    const { data } = await getSpecificBlogPost(blogId);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserSpecificBlogPost = async (blogId, user) => {
  try {
    const { data } = await deleteBlogPost(blogId, user);
    return data;
  } catch (error) {
    console.log(error);
  }
};
