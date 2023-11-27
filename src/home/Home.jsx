import "./Home.css";
import Blog_img from "../assets/blog.png";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
function Home({ UserStatus }) {
  console.log(UserStatus);
  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="home-page-info">
          <h2>Home of thoughts and ideas</h2>
          <div className="home-page-auth">
            <span>
              {UserStatus === false && "login  and  "}share your thought with
              the world
            </span>
            <div className="login-btn">
              {UserStatus === false && (
                <Link to={"/Authentication/Login"}>Login</Link>
              )}
              {UserStatus === false && (
                <Link to={"/Authentication/SignUp"}>Sign up</Link>
              )}
              <Link to={"/categories/All-category"}>Explore</Link>
            </div>
          </div>
        </div>
        <img src={Blog_img} />
      </div>
    </>
  );
}

export default Home;
