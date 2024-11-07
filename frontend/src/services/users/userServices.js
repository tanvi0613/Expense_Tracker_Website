import { getUserFromStorage } from "../../utils/getUserFromStorage";
import axios from "axios";

//Get the token
const token = getUserFromStorage();

//Login
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${import.meta.env.BASE_URL}/users/login`, {
    email,
    password,
  });

  //Return a promise
  return response.data;
};


//register
export const registerAPI = async ({ email, password, username }) => {
  const response = await axios.post(`${import.meta.env.BASE_URL}/users/register`, {
    email,
    password,
    username,
  });

  //Return a promise
  return response.data;
};


//change password
export const changePasswordAPI = async (newPassword) => {
  const response = await axios.put(
    `${import.meta.env.BASE_URL}/users/changePassword`,
    {
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //Return a promise
  return response.data;
};