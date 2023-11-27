import axios from "axios";

const apiRoute = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});


const options = {
  headers: {
    Authorization: "Bearer hoiuse ",
  },
};
// authentication server routing
export const login = (formData) => apiRoute.post("/auth/login", formData);

export const signup = (formData) => apiRoute.post("/auth/signup", formData);

//   blog post sever routing
export const createBlogPost = (formData) =>
  apiRoute.post("/blog/create", formData, options);

export const getBlogPost = () => apiRoute.get("/blog/all_blogs");

//delete blog
export const deleteBlogPost = (blogId, user) =>
  apiRoute.delete("/blog/" + blogId, user);

export const getSpecificBlogPost = (blogId, user) =>
  apiRoute.get(`/blog/current_blog/${blogId}`);

// comment sever route
export const postComment = (formData) =>
  apiRoute.post("/comment/add_comment", formData);

export const getComment = (blogId) =>
  apiRoute.get("/comment/get_comment/" + blogId);

// update user infomation routes
export const UpdateUserProfileImage = (imageFile) =>
  apiRoute.put("/update/user/image", imageFile);

export const UpdateUserPasswordProfile = (formData) =>
  apiRoute.put("/update/user/password", formData);

export const updateUserNamesAndEmailProfile = (formData) =>
  apiRoute.put("/update/user/usersNames", formData);

//update blog post
export const updateBlogPost = (formData) =>
  apiRoute.put("/update/blog/blog", formData);

// find specific user
export const findSpecificUser = (id) => apiRoute.get(`/find/user/${id}`);

// comment sever route
export const likeBlog = (formData) => apiRoute.put("/like/blog", formData);

// file upload route
export const uploadFile = (file) => apiRoute.post("/file/upload/image", file);
