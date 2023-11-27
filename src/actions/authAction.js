import { login, signup } from "../apiCall/blogApi";

export async function loginAction(formData) {
  try {
    const { data } = await login(formData);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function signAction(formData) {
  try {
    const { data } = await signup(formData);
    return data;
  } catch (error) {
    console.log(error);
  }
}
