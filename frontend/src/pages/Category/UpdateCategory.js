import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { updateCategoryAPI } from "../../services/category/categoryService";
import './UpdateCategory.css';
import AlertMessage from "../../components/Alert/Alert";
import ele3 from '../../img/ele3.png';
import TopNav from '../../components/TopNav/TopNav'
import Navigation from '../../components/Navigation/Navigation'


const validationSchema = Yup.object({
  name: Yup.string(),
  type: Yup.string().oneOf(["income", "expense"]),
});

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutateAsync, isError, error, isSuccess } = useMutation({
    mutationFn: updateCategoryAPI,
    mutationKey: ["update-category"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = { ...values, id };
      mutateAsync(data)
        .then(() => {
          navigate("/categories");
        })
        .catch((e) => console.log(e));
    },
  });

  const [active, setActive] = useState(1);

  return (
    <section className='dashboard'>
        <img src={ele3} alt='ele3' className='ele3' />
        <div className='navigations'>
            <TopNav/>
            <Navigation active={active} setActive={setActive}/>
        </div>
        <form onSubmit={formik.handleSubmit} className="form-container">
            <div className="form-header-cat">
                <h2 className="form-title-cat">Update Category</h2>
                <p className="form-subtitle-cat">Fill in the details below.</p>
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
                message="Category updated successfully, redirecting..."
                />
            )}
            <div className="input-group">
                <label htmlFor="type" className="input-label-cat">
                <FaWallet className="icon" />
                <span>Type</span>
                </label>
                <select
                {...formik.getFieldProps("type")}
                id="type-form"
                className="input-field-cat"
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
                <label htmlFor="name" className="input-label-cat">
                <SiDatabricks className="icon" />
                Name
                </label>
                <input
                type="text"
                {...formik.getFieldProps("name")}
                placeholder="Name"
                id="name"
                className="input-field-cat"
                />
                {formik.touched.name && formik.errors.name && (
                <p className="error-text">{formik.errors.name}</p>
                )}
            </div>

            <button type="submit" className="submit-button-cat">
                Update Category
            </button>
        </form>
    </section>
  );
};

export default UpdateCategory;
