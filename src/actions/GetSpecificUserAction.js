import { findSpecificUser } from "../apiCall/blogApi";

export const getSpecificicUser = async (id) => {
    try {
        const {data} = await findSpecificUser(id)
        return data
    } catch (error) {
        console.log(error);
    }
}