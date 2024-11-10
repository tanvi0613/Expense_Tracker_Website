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
    `https://expense-tracker-website-it69.onrender.com/api/v1/transactions/create`,
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
    `https://expense-tracker-website-it69.onrender.com/api/v1/transactions/update/${id}`,
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
  const response = await axios.delete(`https://expense-tracker-website-it69.onrender.com/api/v1/transactions/delete/${id}`, {
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
  const response = await axios.get(`https://expense-tracker-website-it69.onrender.com/api/v1/transactions/list`, {
    params: { category, endDate, startDate, type },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};