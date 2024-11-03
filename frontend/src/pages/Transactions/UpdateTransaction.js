import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { updateTransactionAPI } from "../../services/transactions/transactionService";
import './UpdateTransaction.css';
import AlertMessage from "../../components/Alert/Alert";
import ele3 from '../../img/ele3.png';
import TopNav from '../../components/TopNav/TopNav';
import Navigation from '../../components/Navigation/Navigation';
import { listCategoriesAPI } from "../../services/category/categoryService";

const validationSchema = Yup.object({
  description: Yup.string(),
  amount: Yup.number().positive().integer(),
  date: Yup.date(),
  type: Yup.string().oneOf(["income", "expense"]),
  category: Yup.string()
});

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: categoriesData } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const { mutateAsync, isError, error, isSuccess } = useMutation({
    mutationFn: updateTransactionAPI,
    mutationKey: ["update-transaction"],
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      amount: "",
      date: "",
      type: "",
      category: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = { ...values, id };
      mutateAsync(data)
        .then(() => {
          navigate("/dashboard");
        })
        .catch((e) => console.log(e));
    },
  });

  const [active, setActive] = useState(1);

  return (
    <section className='dashboard'>
      <img src={ele3} alt='ele3' className='ele3' />
      <div className='navigations'>
        <TopNav />
        <Navigation active={active} setActive={setActive} />
      </div>
      <form onSubmit={formik.handleSubmit} className="form-container">
        <div className="form-header">
          <h2 className="form-title">Update Transaction</h2>
          <p className="form-subtitle">Fill in the details below.</p>
        </div>
        {isError && (
          <AlertMessage
            type="error"
            message={
              error?.response?.data?.message ||
              "Something happened, please try again later"
            }
          />
        )}
        {isSuccess && (
          <AlertMessage
            type="success"
            message="Transaction updated successfully, redirecting..."
          />
        )}
        <div className="input-group">
          <label htmlFor="type" className="input-label">
            <FaWallet className="icon" />
            <span>Type</span>
          </label>
          <select
            {...formik.getFieldProps("type")}
            id="type-form"
            className="input-field"
          >
            <option value="">Select transaction type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="error-text">{formik.errors.type}</p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="category" className="input-label">
            <SiDatabricks className="icon" />
            Category
          </label>
          <select {...formik.getFieldProps("category")} className="input-field-transaction">
          <option value="">Select a category</option>
          {categoriesData?.map((category) => (
              <option key={category?._id} value={category?.name}>
                {category?.name}
              </option>
              ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="error-text">{formik.errors.category}</p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="amount" className="input-label">
            Amount
          </label>
          <input
            type="number"
            {...formik.getFieldProps("amount")}
            placeholder="Amount"
            id="amount"
            className="input-field"
          />
          {formik.touched.amount && formik.errors.amount && (
            <p className="error-text">{formik.errors.amount}</p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="date" className="input-label">
            Date
          </label>
          <input
            type="date"
            {...formik.getFieldProps("date")}
            id="date"
            className="input-field"
          />
          {formik.touched.date && formik.errors.date && (
            <p className="error-text">{formik.errors.date}</p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="description" className="input-label">
            Description
          </label>
          <input
            type="text"
            {...formik.getFieldProps("description")}
            placeholder="Description"
            id="description"
            className="input-field"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="error-text">{formik.errors.description}</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Update Transaction
        </button>
      </form>
    </section>
  );
};

export default UpdateTransaction;
