import "./Displayblogpost.css";
import { useEffect, useState } from "react";
import Blog_img from "../assets/bg_blog.jpg";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { getAllBlogPost } from "../actions/blogPostAction";

function DisplayBlogPost() {
  const [blogList, setBlogList] = useState([]);
  const [category, setCategory] = useState("all");

  // geting all the blogs available in the app when category route is open
  useEffect(() => {
    const blogs = async () => {
      const { result } = await getAllBlogPost();
      setBlogList(result);
    };

    return blogs;
  }, []);

  const available_category = [
    "all",
    "tech",
    "game",
    "food",
    "fashion",
    "others",
  ];

  return (
    <>
      <Navbar />
      <div className="display-blog-post">
        <div className="category_list">
          {available_category.map((current_active_category, index) => (
            <span
              onClick={() => setCategory(current_active_category)}
              key={index}
              className={"category"}
            >
              {current_active_category}
            </span>
          ))}
        </div>
        <div className="display-blogs">
          {[...blogList].reverse().map((item) => {
            {
              const urllink = item.image
                ? `http://localhost:3000/images/${item.image}`
                : Blog_img;
              var backGroundUrl = `url(${urllink})`;
            }
            return category === "all" ? (
              <Link
                key={item._id}
                to={`/category/${item.category}/${item._id}`}
              >
                <div
                  style={{
                    background: backGroundUrl,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                  key={item._id}
                  className="display-single-blog"
                >
                  <div className="blog-post-contents-holder">
                    <p className="blog-post-time">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {"  "}
                      in {item.category}
                    </p>
                    <h2 className="blog-post-title">{item.title}</h2>
                    <span className="blog-post-content-info">
                      {item.content && item.content.length >= 10
                        ? item.content.slice(0, 50) + "...."
                        : item.content}
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              category === item.category.toLowerCase() && (
                <Link
                  key={item._id}
                  to={`/category/${item.category}/${item._id}`}
                >
                  <div
                    style={{
                      background: backGroundUrl,
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                    }}
                    key={item._id}
                    className="display-single-blog"
                  >
                    <div className="blog-post-contents-holder">
                      <p className="blog-post-time">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {"  "}
                        in {item.category}
                      </p>
                      <h2 className="blog-post-title">{item.title}</h2>
                      <span className="blog-post-content-info">
                        {item.content && item.content.length >= 10
                          ? item.content.slice(0, 50) + "...."
                          : item.content}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DisplayBlogPost;
