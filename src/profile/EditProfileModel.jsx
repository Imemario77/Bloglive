import { TextInput, Modal } from "@mantine/core";
import React, { useState } from "react";
import { handleInputChange } from "../helperFunctions/handleInput";
import {
  UpdateUserPassword,
  updateUserNamesAndEmail,
} from "../actions/updateUserActions";
import { useDispatch } from "react-redux";

function EditProfileModel({ name, editModal, setEditModal, user }) {
  const [editPassword, setEditPassword] = useState(false);
  const [updatePassword, setUpdatePassword] = useState({
    password: "",
    updatedPassword: "",
    userId: user._id,
  });
  const [userInfo, setUserInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    email: user.email,
    userId: user._id,
  });
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (editPassword) {
      if (updatePassword.password === updatePassword.updatedPassword)
        alert("You Password didn't change");
      else {
        if (
          updatePassword.password === "" ||
          updatePassword.updatedPassword === ""
        )
          alert("Password field can't be empty");
        else {
          const { result } = await UpdateUserPassword(updatePassword);
          console.log(result);
          setUpdatePassword({
            password: "",
            updatedPassword: "",
            userId: user._id,
          });
          if (result.acknowledged) setEditModal(false);
          else alert(result.message);
        }
      }
    } else {
      if (
        userInfo.firstName === "" ||
        userInfo.lastName === "" ||
        userInfo.userName === "" ||
        userInfo.email === ""
      )
        alert("No Field Should be left empty");
      else {
        const result = await updateUserNamesAndEmail(userInfo);
        if (result.result) {
          setEditModal(false);
          dispatch({ type: "AUTH_SUCCESS", payload: result.result });
        } else {
          alert(result.message);
        }
      }
    }
  };

  return (
    <Modal
      size={1000}
      title="Edit Your About Info"
      opened={editModal}
      onClose={editModal}
      withCloseButton={false}
    >
      <div className="edit-input-holder">
        <div className="edit-button-holder">
          <button className="edit-button" onClick={() => setEditModal(false)}>
            Close
          </button>
          <button className="edit-button" onClick={handleSubmit}>
            Save
          </button>
          <button
            className="edit-button"
            onClick={() => setEditPassword((prev) => !prev)}
          >
            Edit {!editPassword ? "Password" : "Names"}
          </button>
        </div>
        {!editPassword && (
          <>
            <input
              type="text"
              className="edit_input"
              value={userInfo.firstName}
              name="firstName"
              placeholder="Change First Name"
              onChange={(e) => {
                handleInputChange(e, setUserInfo);
              }}
            />

            <input
              type="text"
              className="edit_input"
              placeholder="Change Last Name"
              name="lastName"
              value={userInfo.lastName}
              onChange={(e) => {
                handleInputChange(e, setUserInfo);
              }}
            />
            <input
              type="text"
              className="edit_input"
              name="userName"
              placeholder="Change User Name"
              value={userInfo.userName}
              onChange={(e) => {
                handleInputChange(e, setUserInfo);
              }}
            />
            <input
              type="email"
              className="edit_input"
              name="email"
              value={userInfo.email}
              placeholder="Change Email Address"
              onChange={(e) => {
                handleInputChange(e, setUserInfo);
              }}
            />
          </>
        )}
        {editPassword && (
          <>
            <input
              type="text"
              className="edit_input"
              name="password"
              placeholder="Enter Old Password"
              value={updatePassword.password}
              onChange={(e) => {
                handleInputChange(e, setUpdatePassword);
              }}
            />
            <input
              type="text"
              className="edit_input"
              name="updatedPassword"
              placeholder="Enter New Password"
              value={updatePassword.updatedPassword}
              onChange={(e) => {
                handleInputChange(e, setUpdatePassword);
              }}
            />
          </>
        )}
      </div>
    </Modal>
  );
}

export default EditProfileModel;
