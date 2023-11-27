import { useEffect, useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./Createblog.css";
import { MdAddAPhoto } from "react-icons/md";
import { uploadFileAction } from "../actions/uploadPost";
import {
  createBlogPostAction,
  getUserSpecificBlogPost,
} from "../actions/blogPostAction";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  handleFileChange,
  handleFileUpload,
  handleInputChange,
} from "../helperFunctions/handleInput";
import { UpdateUserSpecificBlogPost } from "../actions/updateBlogPostAction";

function CreateBlog({ edit }) {
  const ClickImage = useRef();
  const navigator = useNavigate();
  const blogId = useLocation().pathname.split("/")[2];
  const user = useSelector((state) => state.AuthReducer.authData);
  const [blogInfo, setBlogInfo] = useState({
    title: "",
    image_name: "",
    category: "Tech",
    user: "",
    content: "",
  });


  // handle when a user post a blog 
  const handlePostBlog = async (event) => {
    event.preventDefault();
    // check if the user is uploading an image together with the blog  
    if (blogInfo.image_name && blogInfo.image_name.name) {
      const info = await handleFileUpload(
        blogInfo.image_name,
        blogInfo.image_name.name
      );
      blogInfo.image_name = info.filename;
      var image_data = await uploadFileAction(info.data);
    }

    blogInfo.user = user;

    // check where the user is creating a new blog or editing a previous blog 
    if (edit) {
      blogInfo.blogId = blogId;
      console.log("called");
      UpdateUserSpecificBlogPost(blogInfo);
      navigator(`/category/${blogInfo.category}/${blogId}`);
    } else {
      if (image_data && image_data.status === 200) {
        createBlogPostAction(blogInfo);
        navigator("/categories/All-category");
      } else {
        createBlogPostAction(blogInfo);
        navigator("/categories/All-category");
      }
    }
  };

  // fetching the blog details if the user is updating a blog post 
  useEffect(() => {
    const getBlogInfo = async () => {
      const { result } = await getUserSpecificBlogPost(blogId);
      setBlogInfo(result);
    };

    getBlogInfo();
  }, [blogId]);

  return (
    <>
      <Navbar />
      <div className="create-blog-container">
        <h2>{!edit ? "Create blog" : "Edit Blog"}</h2>
        <form>
          <input
            name="title"
            value={blogInfo && blogInfo.title}
            type="text"
            placeholder="Blog title"
            onChange={(e) => {
              handleInputChange(e, setBlogInfo);
            }}
          />
          <MdAddAPhoto
            className="img_icon "
            onClick={() => {
              ClickImage.current.click();
            }}
          />
          <input
            type="file"
            style={{ display: "none" }}
            ref={ClickImage}
            onChange={(e) => handleFileChange(e, "image_name", setBlogInfo)}
            name="image_name"
          />
          <select
            onChange={(e) => {
              handleInputChange(e, setBlogInfo);
            }}
            value={blogInfo && blogInfo.category}
            name="category"
          >
            <option value="Tech">Tech</option>
            <option value="Game">Game</option>
            <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
            <option value="Others">Others</option>
          </select>
          <textarea
            onChange={(e) => {
              handleInputChange(e, setBlogInfo);
            }}
            name="content"
            placeholder="Blog content"
            value={blogInfo && blogInfo.content}
          ></textarea>
          <button onClick={handlePostBlog} type="submit">
            Post Now
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateBlog;
