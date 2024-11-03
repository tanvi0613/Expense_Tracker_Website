import React, { useState } from "react";
import { useFormik } from "formik";
import './AddCategory.css'
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/Alert/Alert";
import { addCategoryAPI } from "../../services/category/categoryService";
import ele3 from '../../img/ele3.png';
import TopNav from '../../components/TopNav/TopNav'
import Navigation from '../../components/Navigation/Navigation'

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const AddCategory = () => {
  const navigate = useNavigate();
  const { mutateAsync, isError, error, isSuccess } = useMutation({
    mutationFn: addCategoryAPI,
    mutationKey: ["login"],
  });

  const formik = useFormik({
    initialValues: { type: "", name: "" },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then(() => navigate("/categories"))
        .catch((e) => console.log(e));
    },
  });

  const [active, setActive] = useState(2);

  return (
    <section className='addCategory-top'>
      <img src={ele3} alt='ele3' className='ele3' />
      <div className='navigations'>
          <TopNav/>
          <Navigation active={active} setActive={setActive}/>
      </div>
      <form onSubmit={formik.handleSubmit} className="category-container">
          <div className="text-center">
              <h2 className="form-title">Add New Category</h2>
              <p className="form-subtitle">Categorize expenses wisely to understand spending patterns</p>
              <p className="form-subtitle">Fill in the details below.</p>
          </div>
          {isError && (
              <AlertMessage
              type="error"
              message={
                  error?.response?.data?.message ||
                  "Something happened please try again later"
              }
              />
          )}
          {isSuccess && (
              <AlertMessage
              type="success"
              message="Category added successfully, redirecting..."
              />
          )}
          <div className="form-group">
              <label htmlFor="type" className="form-label">
              <FaWallet className="icon-category" /> Type
              </label>
              <select {...formik.getFieldProps("type")} id="type-form" className="form-input">
              <option value="">Select transaction type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              </select>
              {formik.touched.type && formik.errors.type && (
              <p className="form-error">{formik.errors.type}</p>
              )}
          </div>

          <div className="form-group">
              <label htmlFor="name" className="form-label">
              <SiDatabricks className="icon-category" /> Name
              </label>
              <input
              type="text"
              {...formik.getFieldProps("name")}
              id="name"
              placeholder="Name"
              className="form-input"
              />
              {formik.touched.name && formik.errors.name && (
              <p className="form-error">{formik.errors.name}</p>
              )}
          </div>

          <button type="submit" className="form-button">
              Add Category
          </button>
      </form>
    </section>
  );
};

export default AddCategory;
