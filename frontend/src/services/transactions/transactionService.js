import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//Get the token
const token = getUserFromStorage();


//Add
export const addTransactionAPI = async ({
  type,
  category,
  date,
  description,
  amount,
}) => {
  const response = await axios.post(
    `${import.meta.env.BASE_URL}/transactions/create`,
    {
      category,
      date,
      description,
      amount,
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
export const updateTransactionAPI = async ({
  id,
  description,
  amount,
  date,
  type,
  category,
}) => {
  const response = await axios.put(
    `${import.meta.env.BASE_URL}/transactions/update/${id}`,
    {
      description,
      amount,
      date,
      type,
      category,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  // Return the updated transaction data
  return response.data;
};


//delete
export const deleteTransactionAPI = async (id) => {
  const response = await axios.delete(`${import.meta.env.BASE_URL}/transactions/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};


//lists
export const listTransactionsAPI = async ({
  category,
  type,
  startDate,
  endDate,
}) => {
  const response = await axios.get(`${import.meta.env.BASE_URL}/transactions/list`, {
    params: { category, endDate, startDate, type },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};