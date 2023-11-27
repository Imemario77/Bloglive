import "./App.css";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import DisplayBlogPost from "./blogposts/Displayblogpost";
import SinglePost from "./blogposts/SinglePost";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Profile from "./profile/Profile";
import CreateBlog from "./createblog/Createblog";
import Auth from "./auth/Auth";
import { useSelector } from "react-redux";

function App() {
  const User = useSelector((state) => state.AuthReducer.authData);

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home UserStatus={User ? true : false} />,
    },
    {
      path: "/categories/:category",
      element: <DisplayBlogPost />,
    },
    {
      path: "/profile/:id",
      element: User ? <Profile /> : <Navigate to={"/Authentication/Login"} />,
    },
    {
      path: "/create-new-blog-post",
      element: User ? (
        <CreateBlog edit={false} />
      ) : (
        <Navigate to={"/Authentication/Login"} />
      ),
    },
    {
      path: "/category/:categoryname/:blogid",
      element: User ? (
        <SinglePost />
      ) : (
        <Navigate to={"/Authentication/Login"} />
      ),
    },

    {
      path: "/Authentication/Login",
      element: User ? <Navigate to={"/"} /> : <Auth login={true} />,
    },
    {
      path: "/Authentication/Signup",
      element: User ? <Navigate to={"/"} /> : <Auth login={false} />,
    },
    {
      path: "/Edit-blog-post/:id",
      element: User ? <CreateBlog edit={true} /> : <Auth login={false} />,
    },
  ]);
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
