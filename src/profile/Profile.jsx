import Blog_img from "../assets/blog.png";
import "./Profile.css";
import Navbar from "../navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { HiCamera } from "react-icons/hi";
import { TbCameraPlus } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import {
  handleFileChange,
  handleFileUpload,
} from "../helperFunctions/handleInput";
import { updateProfilePhoto } from "../actions/updateUserActions";
import { uploadFileAction } from "../actions/uploadPost";
import PictureModel from "./PictureModel";
import EditProfileModel from "./EditProfileModel";
import { getSpecificicUser } from "../actions/GetSpecificUserAction";

function Profile() {
  const user = useSelector((state) => state.AuthReducer.authData);
  const location = useLocation().pathname.split("/")[2];
  const authenticatUser = user && user._id === location;
  const imageRef = useRef();
  const [imageModal, setImageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [imageName, setImageName] = useState("");
  const [viewUser, setViewUser] = useState({});
  const [names, setNames] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userName: user.userName,
  });
  const dispatch = useDispatch();

  const handleUpdateImage = async () => {
    const info = await handleFileUpload(imageName, imageName.name);
    const upload_profile_image = await uploadFileAction(info.data);
    if (upload_profile_image && upload_profile_image.status === 200) {
      const result = await updateProfilePhoto({
        image: info.filename,
        userId: user._id,
      });
      console.log(result);
      dispatch({ type: "AUTH_SUCCESS", payload: result.result });
      setImageModal("");
      setImageName("");
    }
  };

  useEffect(() => {
    const findUser = async () => {
      if (user._id !== location) {
        const { result } = await getSpecificicUser(location);
        setViewUser(result);
        console.log(result);
      }
    };

    findUser();
  }, [location, user]);

  return (
    <>
      <Navbar />
      <div className="profile-holder">
        <span>Author</span>
        <span>
          {authenticatUser
            ? "Name:  " +
              user.firstName +
              "   " +
              user.lastName +
              "  {User Name:  " +
              user.userName +
              "}"
            : viewUser && viewUser.userName}
        </span>
        <div>
          <img
            src={
              authenticatUser && user && user.image
                ? `http://localhost:3000/images/${user.image}`
                : viewUser && viewUser.image
                ? ` http://localhost:3000/images/${viewUser.image}`
                : Blog_img
            }
            alt="user profile image"
          />
          {authenticatUser && (
            <TbCameraPlus
              onClick={() => {
                imageRef.current.click();
                setImageModal(true);
              }}
              className="cam_icon"
            />
          )}

          <input
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "", setImageName)}
            ref={imageRef}
            type="file"
          />
        </div>

        <div className="user-info-page">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero,
          culpa facilis alias nisi eaque asperiores quod voluptates, aperiam,
          aliquam iure reiciendis sequi! Ab, veniam corporis? Id nulla impedit
          hic expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Rem, maxime temporibus! Voluptate asperiores repellendus eum? Vel, qui
          facilis? Voluptatem iste quibusdam velit quidem amet blanditiis non
          alias consequuntur et assumenda? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Qui optio unde ratione, dolore placeat
          tempore nam distinctio sapiente accusantium nemo quisquam quas? Magni
          saepe, harum odit aut nobis veniam quos? Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Doloremque iste nihil quam ut. Omnis
          eligendi minima impedit officia dignissimos! Rem suscipit, accusantium
          quidem esse dolor omnis tempora asperiores beatae facere! Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Rem voluptate quidem,
          assumenda quod dignissimos corrupti nostrum? Veniam temporibus
          excepturi ipsum harum? Recusandae quis facere fuga eaque. Aperiam ad
          autem accusamus. Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Necessitatibus aliquam id ad deserunt natus dignissimos sint
          reiciendis accusamus. Id distinctio esse animi possimus quia dolores
          aliquam, similique ad natus maiores. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Commodi veritatis voluptas magnam odio
          tenetur perferendis libero consequuntur, doloremque impedit iure nisi
          tempore! Voluptatibus dolore placeat aliquam modi nemo nobis. Labore.
        </div>
        {authenticatUser && (
          <div className="create-blog-link-holder">
            <Link
              className="create-new-blog"
              onClick={() => setEditModal(true)}
            >
              Edit Profile
            </Link>
            <Link className="create-new-blog" to={"/create-new-blog-post"}>
              Create New Post
            </Link>
          </div>
        )}
      </div>
      <PictureModel
        imageModal={imageModal}
        imageName={imageName}
        handleUpdateImage={handleUpdateImage}
        setImageModal={setImageModal}
        setImageName={setImageName}
      />
      <EditProfileModel
        name={names}
        editModal={editModal}
        setEditModal={setEditModal}
        user={user}
      />
    </>
  );
}

export default Profile;
