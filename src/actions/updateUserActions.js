import {
  UpdateUserPasswordProfile,
  UpdateUserProfileImage,
  updateUserNamesAndEmailProfile,
} from "../apiCall/blogApi";

export const updateProfilePhoto = async (imageFile) => {
  try {
    const { data } = await UpdateUserProfileImage(imageFile);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserNamesAndEmail = async (formData) => {
  try {
    const { data } = await updateUserNamesAndEmailProfile(formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateUserPassword = async (formData) => {
  try {
    const { data } = await UpdateUserPasswordProfile(formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
