/* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { FaDollarSign, FaCalendarAlt, FaRegCommentDots, FaWallet } from "react-icons/fa";
// import "./TransactionForm.css";
// import AlertMessage from "../../components/Alert/Alert";
// import { listCategoriesAPI } from "../../services/category/categoryService";
// import { addTransactionAPI } from "../../services/transactions/transactionService";
// import ele3 from '../../img/ele3.png';
// import TopNav from '../../components/TopNav/TopNav'
// import Navigation from '../../components/Navigation/Navigation'


// const validationSchema = Yup.object({
//   type: Yup.string().required("Transaction type is required").oneOf(["income", "expense"]),
//   amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
//   category: Yup.string().required("Category is required"),
//   date: Yup.date().required("Date is required"),
//   description: Yup.string(),
// });

// const TransactionForm = () => {
//   const navigate = useNavigate();

//   const { mutateAsync, isSuccess } = useMutation({
//     mutationFn: addTransactionAPI,
//     mutationKey: ["add-transaction"],
//   });

//   const { data, isError, error} = useQuery({
//     queryFn: listCategoriesAPI,
//     queryKey: ["list-categories"],
//   });

//   const formik = useFormik({
//     initialValues: {
//       type: "",
//       amount: "",
//       category: "",
//       date: "",
//       description: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       console.log("Submitting transaction:", values);
//       mutateAsync(values)
//         .then(() => {
//           navigate("/dashboard");
//         })
//         .catch((e) => console.log(e));
//     },
//   });

//   const [active, setActive] = useState(4);

//   return (
//     <section className='dashboard'>
//         <img src={ele3} alt='ele3' className='ele3' />
//         <div className='navigations'>
//             <TopNav/>
//             <Navigation active={active} setActive={setActive}/>
//         </div>
//         <form onSubmit={formik.handleSubmit} className="form-container">
//             <div className="form-header">
//                 <h2>TRANSACTION DETAILS</h2>
//                 <p>Fill in the details below.</p>
//             </div>

//             {isError && <AlertMessage type="error" message={error?.response?.data?.message || "Something happened, please try again later"} />}
//             {isSuccess && <AlertMessage type="success" message="Transaction added successfully" />}

//             <div className="input-group">
//                 <label htmlFor="type" className="input-label">
//                 <FaWallet className="icon" />
//                 Type
//                 </label>
//                 <select {...formik.getFieldProps("type")} id="type" className="input-field-transaction">
//                 <option value="">Select transaction type</option>
//                 <option value="income">Income</option>
//                 <option value="expense">Expense</option>
//                 </select>
//                 {formik.touched.type && formik.errors.type && <p className="error-text">{formik.errors.type}</p>}
//             </div>

//             <div className="input-group">
//                 <label htmlFor="amount" className="input-label">
//                 <FaDollarSign className="icon" />
//                 Amount
//                 </label>
//                 <input
//                 type="number"
//                 {...formik.getFieldProps("amount")}
//                 id="amount"
//                 placeholder="Amount"
//                 className="input-field"
//                 />
//                 {formik.touched.amount && formik.errors.amount && <p className="error-text">{formik.errors.amount}</p>}
//             </div>

//             <div className="input-group">
//                 <label htmlFor="category" className="input-label">
//                 <FaRegCommentDots className="icon" />
//                 Category
//                 </label>
//                 <select {...formik.getFieldProps("category")} id="category" className="input-field-transaction">
//                 <option value="">Select a category</option>
//                 {data?.map((category) => (
//                     <option key={category?._id} value={category?.name}>
//                     {category?.name}
//                     </option>
//                 ))}
//                 </select>
//                 {formik.touched.category && formik.errors.category && <p className="error-text">{formik.errors.category}</p>}
//             </div>

//             <div className="input-group">
//                 <label htmlFor="date" className="input-label">
//                 <FaCalendarAlt className="icon" />
//                 Date
//                 </label>
//                 <input type="date" {...formik.getFieldProps("date")} id="date" className="input-field" />
//                 {formik.touched.date && formik.errors.date && <p className="error-text">{formik.errors.date}</p>}
//             </div>

//             <div className="input-group">
//                 <label htmlFor="description" className="input-label">
//                 <FaRegCommentDots className="icon" />
//                 Description (Optional)
//                 </label>
//                 <textarea
//                 {...formik.getFieldProps("description")}
//                 id="description"
//                 placeholder="Description"
//                 rows="3"
//                 className="input-field"
//                 ></textarea>
//                 {formik.touched.description && formik.errors.description && <p className="error-text">{formik.errors.description}</p>}
//             </div>

//             <button type="submit" className="submit-button">
//                 Submit Transaction
//             </button>
//         </form>
//     </section>
//   );
// };

// export default TransactionForm;


import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaRupeeSign, FaCalendarAlt, FaRegCommentDots, FaWallet } from "react-icons/fa";
import "./TransactionForm.css";
import AlertMessage from "../../components/Alert/Alert";
import { listCategoriesAPI } from "../../services/category/categoryService";
import { addTransactionAPI } from "../../services/transactions/transactionService";
import ele3 from '../../img/ele3.png';
import TopNav from '../../components/TopNav/TopNav'
import Navigation from '../../components/Navigation/Navigation'

// API to get exchange rates relative to INR
const getExchangeRateToINR = async (currency) => {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);
  const data = await response.json();
  return data.rates.INR;
};

const validationSchema = Yup.object({
  type: Yup.string().required("Transaction type is required").oneOf(["income", "expense"]),
  amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string(),
  currency: Yup.string().required("Currency is required")
});

const TransactionForm = () => {
  const navigate = useNavigate();
  const [convertedAmount, setConvertedAmount] = useState(null);

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: addTransactionAPI,
    mutationKey: ["add-transaction"],
  });

  const { data, isError, error } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      amount: "",
      category: "",
      date: "",
      description: "",
      currency: "INR",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Submitting transaction:", values);

      if (values.currency !== "INR") {
        const rate = await getExchangeRateToINR(values.currency);
        const convertedAmount = values.amount * rate;
        values.amount = convertedAmount;
      }

      mutateAsync(values)
        .then(() => {
          navigate("/dashboard");
        })
        .catch((e) => console.log(e));
    },
  });

  const [active, setActive] = useState(4);

  return (
    <section className="dashboard">
      <img src={ele3} alt="ele3" className="ele3" />
      <div className="navigations">
        <TopNav />
        <Navigation active={active} setActive={setActive} />
      </div>
      <form onSubmit={formik.handleSubmit} className="form-container">
        <div className="form-header">
          <h2>TRANSACTION DETAILS</h2>
          <p>Fill in the details below.</p>
        </div>

        {isError && (
          <AlertMessage
            type="error"
            message={
              error?.response?.data?.message || "Something happened, please try again later"
            }
          />
        )}
        {isSuccess && <AlertMessage type="success" message="Transaction added successfully" />}

        <div className="input-group">
          <label htmlFor="type" className="input-label">
            <FaWallet className="icon" />
            Type
          </label>
          <select {...formik.getFieldProps("type")} id="type" className="input-field-transaction">
            <option value="">Select transaction type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {formik.touched.type && formik.errors.type && <p className="error-text">{formik.errors.type}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="currency" className="input-label">
            <FaRupeeSign className="icon" />
            Currency
          </label>
          <select {...formik.getFieldProps("currency")} id="currency" className="input-field-transaction">
            <option value="">Select currency</option>
            <option value="INR">INR (Indian Rupee)</option>
            <option value="USD">USD (US Dollar)</option>
            <option value="EUR">EUR (Euro)</option>
            <option value="GBP">GBP (British Pound)</option>
            <option value="JPY">JPY (Japanese Yen)</option>
            <option value="AUD">AUD (Australian Dollar)</option>
            <option value="CAD">CAD (Canadian Dollar)</option>
            <option value="CHF">CHF (Swiss Franc)</option>
            <option value="CNY">CNY (Chinese Yuan)</option>
            <option value="MXN">MXN (Mexican Peso)</option>
            <option value="SGD">SGD (Singapore Dollar)</option>
            <option value="RUB">RUB (Russian Ruble)</option>
            <option value="BRL">BRL (Brazilian Real)</option>
            <option value="ZAR">ZAR (South African Rand)</option>
            <option value="NZD">NZD (New Zealand Dollar)</option>
            <option value="HKD">HKD (Hong Kong Dollar)</option>
          </select>

          {formik.touched.currency && formik.errors.currency && <p className="error-text">{formik.errors.currency}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="amount" className="input-label">
            <FaRupeeSign className="icon" />
            Amount
          </label>
          <input
            type="number"
            {...formik.getFieldProps("amount")}
            id="amount"
            placeholder="Amount"
            className="input-field"
          />
          {formik.touched.amount && formik.errors.amount && <p className="error-text">{formik.errors.amount}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="category" className="input-label">
            <FaRegCommentDots className="icon" />
            Category
          </label>
          <select {...formik.getFieldProps("category")} id="category" className="input-field-transaction">
            <option value="">Select a category</option>
            {data?.map((category) => (
              <option key={category?._id} value={category?.name}>
                {category?.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && <p className="error-text">{formik.errors.category}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="date" className="input-label">
            <FaCalendarAlt className="icon" />
            Date
          </label>
          <input type="date" {...formik.getFieldProps("date")} id="date" className="input-field" />
          {formik.touched.date && formik.errors.date && <p className="error-text">{formik.errors.date}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="description" className="input-label">
            <FaRegCommentDots className="icon" />
            Description (Optional)
          </label>
          <textarea
            {...formik.getFieldProps("description")}
            id="description"
            placeholder="Description"
            rows="3"
            className="input-field"
          ></textarea>
          {formik.touched.description && formik.errors.description && <p className="error-text">{formik.errors.description}</p>}
        </div>

        <button type="submit" className="submit-button">
          Submit Transaction
        </button>
      </form>
    </section>
  );
};

export default TransactionForm;
