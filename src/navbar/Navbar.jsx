import "./Navbar.css";
import { Link } from "react-router-dom";
import Blog_img from "../assets/blog.png";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.AuthReducer.authData);
  return (
    <>
      <div className="nav-bar-holder">
        <div className="nav-logo">Blog Live</div>
        <div className="nav-selector">
          <Link className="nav-link-a" to={"/"}>
            Home
          </Link>
          <Link className="nav-link-a" to={"/categories/All-category"}>
            Category
          </Link>
          <Link className="nav-link-a" to={"/"}>
            About
          </Link>
        </div>
        <div>
          <input type="text" />
          <Link to={user ? `/profile/${user._id}` : "/Authentication/Login"}>
            <img className="navbar-profile-image"
              
              src={
                user && user.image
                  ? `http://localhost:3000/images/${user.image}`
                  : Blog_img
              }
              alt="profile image"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
