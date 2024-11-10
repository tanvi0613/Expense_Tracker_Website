// import { getUserFromStorage } from "../../utils/getUserFromStorage";
// import axios from "axios";

// //Get the token
// const token = getUserFromStorage();

// //Login
// export const loginAPI = async ({ email, password }) => {
//   const response = await axios.post(`http://localhost:8000/api/v1/users/login`, {
//     email,
//     password,
//   });

//   //Return a promise
//   return response.data;
// };


// //register
// export const registerAPI = async ({ email, password, username }) => {
//   const response = await axios.post(`http://localhost:8000/api/v1/users/register`, {
//     email,
//     password,
//     username,
//   });

//   //Return a promise
//   return response.data;
// };


// //change password
// export const changePasswordAPI = async (newPassword) => {
//   const response = await axios.put(
//     `http://localhost:8000/api/v1/users/changePassword`,
//     {
//       newPassword,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   //Return a promise
//   return response.data;
// };

import { getUserFromStorage } from "../../utils/getUserFromStorage";
import axios from "axios";

// Get the token
const token = getUserFromStorage() || ''; // Fallback to an empty string if token is undefined

// Login
export const loginAPI = async ({ email, password }) => {
  try {
    const response = await axios.post(`https://expense-tracker-website-it69.onrender.com/api/v1/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error); // Logs full error
    if (error.response) {
      console.error("Error response data:", error.response.data); // Logs server error details
      console.error("Error response status:", error.response.status); // Logs HTTP status code
    } else if (error.request) {
      console.error("Request made but no response received:", error.request); // Logs the request details
    } else {
      console.error("Error setting up request:", error.message); // Logs other errors
    }
    return null;
  }
};


// Register
export const registerAPI = async ({ email, password, username }) => {
  try {
    const response = await axios.post(`https://expense-tracker-website-it69.onrender.com/api/v1/users/register`, {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    return null; // Handle the error appropriately
  }
};

// Change Password
export const changePasswordAPI = async (newPassword) => {
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.put(
      `https://expense-tracker-website-it69.onrender.com/api/v1/users/changePassword`,
      {
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Change password failed:", error);
    return null; // Handle the error appropriately
  }
};
