import Blog_img from "../assets/bg_blog.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Navbar from "../navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  deleteUserSpecificBlogPost,
  getUserSpecificBlogPost,
} from "../actions/blogPostAction";
import { likeBlogAction } from "../actions/likeAction";
import { useSelector } from "react-redux";
import { GetBlogComments, postBlogComment } from "../actions/commentsAction";
import MantelModal from "../componets/MantelModel";
import { io } from "socket.io-client";

function SinglePost() {
  const socket = useRef();
  const scroll = useRef();

  const location = useLocation();
  const userId = useSelector((state) => state.AuthReducer.authData._id);
  const userName = useSelector((state) => state.AuthReducer.authData.userName);
  const user = useSelector((state) => state.AuthReducer.authData);
  const [blog, setBlog] = useState();
  const [likesCount, setLikesCount] = useState(0);
  const blogId = location.pathname.split("/")[3];
  const [liked, setLiked] = useState(false);

  const [commentCount, setCommentCount] = useState(0);

  const [comment, setComment] = useState();
  const [modelOpen, setModelOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  // geting this current blog info
  useEffect(() => {
    const getBlog = async () => {
      const { result } = await getUserSpecificBlogPost(blogId);
      setBlog(result);
    };

    getBlog();
  }, [blogId]);

  // setting the likes
  useEffect(() => {
    blog && setLiked(blog.likes.includes(userId));
    blog && setLikesCount(blog.likes.length);
  }, [blog]);

  // getting all the blogs comments
  useEffect(() => {
    const getComments = async () => {
      const { result } = await GetBlogComments(blogId);
      if (result.message) {
        alert(result.message);
      }
      setComment(result);
      setCommentCount(result.length);
    };

    getComments();
  }, [blog, comment]);

  // handle when the user likes a blog
  const handleLikeButton = async () => {
    await setLiked((prev) => !prev);
    liked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
    socket.current.emit("like-blog", {
      blogId,
      userId,
      liked: !liked,
    });
    await likeBlogAction({ userId, blogId });
  };

  //handle delete blog post
  const handleDeleteBlogPost = async () => {
    await deleteUserSpecificBlogPost(blogId, { user: user });
    window.location = "/";
  };

  // handle the comments sections
  const handleCommentPost = async () => {
    const commentData = {
      blogId,
      userId,
      comment: newComment,
      user,
      userName,
    };
    const { result } = await postBlogComment(commentData);
    if (result.message) {
      alert(result.message);
    } else {
      setComment((prevcomment) => [...prevcomment, commentData]);
      setNewComment("");
      setModelOpen(false);
    }
    socket.current.emit("comment", commentData);
  };

  //handle socket connections
  useEffect(() => {
    function connect_to_io() {
      socket.current = io("http://localhost:3000");
      socket.current.emit("join-Blog", { userId, blogId });
    }

    connect_to_io();
  }, []);

  useEffect(() => {
    socket.current.on("response-like-blog", (event) => {
      if (event.liked) {
        setLikesCount((prev) => prev + 1);
      } else {
        setLikesCount((prev) => prev - 1);
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.current.on("response-comment", (event) => {
      setComment((prevcomment) => [...prevcomment, event]);
    });
  }, [socket]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <>
      <Navbar />
      <div className="single-post-blog-holder">
        <div className="image-div">
          <img
            src={
              blog && blog.image
                ? `http://localhost:3000/images/${blog.image}`
                : Blog_img
            }
            alt="blog img content"
          />
          <Link
            to={blog && blog.author && `/profile/${blog.author._id}`}
            style={{
              fontWeight: "600",
              color: "black",
              textDecoration: "none",
              fontSize: "20px",
              textTransform: "capitalize",
            }}
          >
            Author: {blog && blog.author ? blog.author.userName : "No User"}
          </Link>
        </div>

        <div className="single-post-blog-content">
          <div className="content-box-holder">
            <h2 className="single-blog-post-title">{blog && blog.title}</h2>
            <p className="single-blog-post-time">
              {blog &&
                new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              {"  "} in {blog && blog.category}
            </p>
            <span className="single-blog-post-content-info">
              {blog && blog.content}
            </span>
          </div>
          <div className="single-blog-comment-section">
            <span>{likesCount} likes</span>{" "}
            <span style={{ padding: "0px 10px" }}>{commentCount} comments</span>
            <div className="like-comment-section">
              <div>
                {liked ? (
                  <AiFillHeart
                    onClick={() => handleLikeButton()}
                    style={{
                      fontSize: "2.5rem",
                      color: "red",
                      margin: "20px",
                      marginLeft: "0",
                    }}
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={handleLikeButton}
                    style={{
                      fontSize: "2.5rem",
                      color: "black",
                      margin: "20px",
                      marginLeft: "0",
                    }}
                  />
                )}

                <GoComment
                  onClick={() => setModelOpen(true)}
                  style={{ fontSize: "2.5rem", color: "black", margin: "20px" }}
                />
                {blog && userId === blog.author._id && (
                  <Link to={`/Edit-blog-post/${blogId}`}>
                    <CiEdit
                      style={{
                        fontSize: "2.5rem",
                        color: "black",
                        margin: "20px",
                      }}
                    />
                  </Link>
                )}
                {blog && userId === blog.author._id && (
                  <RiDeleteBin5Line
                    onClick={handleDeleteBlogPost}
                    style={{
                      fontSize: "2.5rem",
                      color: "red",
                      margin: "20px",
                    }}
                  />
                )}
              </div>
              <div className="comments-container">
                {comment &&
                  comment.map((message, index) => {
                    return (
                      <div ref={scroll} key={index}>
                        <span style={{ fontWeight: "600", fontSize: "14px" }}>
                          <b style={{ padding: "0px 5px" }}>
                            {message.userName}
                          </b>{" "}
                          3weeks
                        </span>
                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "18px",
                            padding: "10px",
                            paddingBottom: "5px",
                          }}
                        >
                          {message.comment}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MantelModal
        newComment={newComment}
        setNewComment={setNewComment}
        opened={modelOpen}
        setModelOpen={setModelOpen}
        submit={handleCommentPost}
      />
    </>
  );
}

export default SinglePost;
