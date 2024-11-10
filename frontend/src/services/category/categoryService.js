import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
//import { REACT_APP_BASE_URL } from "../../utils/url";

//Get the token
const token = getUserFromStorage();
console.log("Token:", token); 

//Add
export const addCategoryAPI = async ({ name, type }) => {
  const response = await axios.post(
    `https://expense-tracker-website-it69.onrender.com/api/v1/categories/create`,
    {
      name,
      type,
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


//update
export const updateCategoryAPI = async ({ name, type, id }) => {
  const response = await axios.put(
    `https://expense-tracker-website-it69.onrender.com/api/v1/categories/update/${id}`,
    {
      name,
      type,
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


//delete
export const deleteCategoryAPI = async (id) => {
  const response = await axios.delete(`https://expense-tracker-website-it69.onrender.com/api/v1/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};


//lists
export const listCategoriesAPI = async () => {
  const response = await axios.get(`https://expense-tracker-website-it69.onrender.com/api/v1/categories/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};