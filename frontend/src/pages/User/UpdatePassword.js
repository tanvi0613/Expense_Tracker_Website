import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import AlertMessage from "../../components/Alert/Alert";
import { logoutAction } from "../../redux/slice/authSlice";
import { changePasswordAPI } from "../../services/users/userServices";
import ribbon from '../../img/ribbon.png';
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: changePasswordAPI,
    mutationKey: ["change-password"],
  });

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values.password)
        .then(() => {
          dispatch(logoutAction());
          localStorage.removeItem("userInfo");
        })
        .catch((e) => console.log(e));
    },
  });

  const handleUpdatePassword = () => {
    navigate('/login');
  };

  return (
    <section className='updatepassword-page'>
      <input type='text' id='updatepassword-search' placeholder='Update Password'></input>
      <img src={ribbon} alt='ribbon' className='ribbon1'></img>
      <img src={ribbon} alt='ribbon' className='ribbon2'></img>
      <div className="updatepassword-main">
      <form onSubmit={formik.handleSubmit} className="updatepassword-form">
      <h2 className="updatepassword-title">Change Your Password</h2><br/>
        <div className="updatepassword-container">
          <label className="updatepassword-label" htmlFor="new-password">
            New Password
          </label>
          {isPending && <AlertMessage type="loading" message="Updating...." />}
          {isError && (
            <AlertMessage type="error" message={error.response.data.message} />
          )}
          {isSuccess && (
            <AlertMessage
              type="success"
              message="Password updated successfully"
            />
          )}
          <div className="updatepassword-wrapper">
            <input
              id="updatepassword-input"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("password")}
              className="updatepassword-input"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="error-message">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button type="submit" className="updatepassword-button" onClick={handleUpdatePassword}>
          Update Password
        </button>
      </form>
    </div>
    </section>
  );
};

export default UpdatePassword;
