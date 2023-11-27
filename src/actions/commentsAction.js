import { getComment, postComment } from "../apiCall/blogApi";

export const GetBlogComments = async (blogId) => {
  try {
    const { data } = await getComment(blogId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postBlogComment = async (formData) => {
  try {
    const { data } = await postComment(formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
