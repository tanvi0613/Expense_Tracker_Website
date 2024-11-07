import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
//import { BASE_URL } from "../../utils/url";

//Get the token
const token = getUserFromStorage();
console.log("Token:", token); 

//Add
export const addCategoryAPI = async ({ name, type }) => {
  const response = await axios.post(
    `${import.meta.env.BASE_URL}/categories/create`,
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
    `${import.meta.env.BASE_URL}/categories/update/${id}`,
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
  const response = await axios.delete(`${import.meta.env.BASE_URL}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};


//lists
export const listCategoriesAPI = async () => {
  const response = await axios.get(`${import.meta.env.BASE_URL}/categories/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};