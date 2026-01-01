// import React, { useEffect } from 'react'
// import './Login.css'
// import { useFormik } from "formik";
// import * as Yup from 'yup';
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useMutation } from "@tanstack/react-query";
// import ribbon from '../../img/ribbon.png';
// import { loginAPI } from '../../services/users/userServices';
// import { loginAction } from '../../redux/slice/authSlice';
// import AlertMessage from '../../components/Alert/Alert';


// //validations
// const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid").required("Email is required"),
//     password: Yup.string().min(5, "Password must be at least 5 characters long").required("Password is required"),
// });

// function Login() {

//     //Navigate
//     const navigate = useNavigate();

//     //Dispatch
//     const dispatch = useDispatch();

//     //mutation
//     const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
//         mutationFn: loginAPI,
//         mutationKey: ["login"],
//     });
      
//     const formik = useFormik({
//         initialValues:{
//             email:"",
//             password:""
//         },

//         //validations
//         validationSchema: validationSchema,

//         //Submit
//         onSubmit:(values) => {
//             console.log(values);
//             //http request
//             mutateAsync(values)
//             .then((data) => {
//                 //dispatch
//                 dispatch(loginAction(data));
//                 //Save the user into localStorage so that on reloading the user stays logged in
//                 localStorage.setItem("userInfo", JSON.stringify(data));
//             })
//             .catch((e) => console.log(e));
//         },
//     });
//     //Redirect
//     useEffect(() => {
//         setTimeout(() => {
//         if (isSuccess) {
//             navigate("/dashboard");
//         }
//         }, 2000);
//     }, [navigate, isSuccess]);

//     return (
//         <section className='login-page'>
//         <input type='text' id='login-search' placeholder='Login'></input>
//         <img src={ribbon} alt='ribbon' className='ribbon1'></img>
//         <img src={ribbon} alt='ribbon' className='ribbon2'></img>
//         <div className='login-main'>
//             <form onSubmit={formik.handleSubmit} className='login-form'>

//                 {isPending && <AlertMessage type='loading' message='Logging you in...' />}
//                 {isError && <AlertMessage type='error' message={error.response.data.message} />}
//                 {isSuccess && <AlertMessage type='success' message='Logged In Successfully' />}

//                 <label className='login-label'>Email</label><br/>
//                 <input type='email'
//                 placeholder='Enter email'
//                 className='login-input'
//                 {...formik.getFieldProps("email")}
//                 /><br/>
//                 {formik.touched.email && formik.errors.email && (
//                     <span className='login-error'>{formik.errors.email}</span>
//                 )}
//                 <br/><br/>
//                 <label className='login-label'>Password</label><br/>
//                 <input type='password'
//                 placeholder='********'
//                 className='login-input'
//                 {...formik.getFieldProps("password")}
//                 />
//                 <br/><br/>
//                 {formik.touched.password && formik.errors.password && (
//                     <span className='login-error'>{formik.errors.password}</span>
//                 )}
//                 <br/><br/>
//                 <button type='submit' className='login-button'>Submit</button>
//                 <p>
//                     Don't have an account?{' '}
//                     <a href="/register" className="login-link">Sign up here</a>
//                 </p>
//             </form>
//         </div>
//         </section>
//     )
// }

// export default Login




import React, { useEffect } from "react";
import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import ribbon from "../../img/ribbon.png";
import { loginAPI } from "../../services/users/userServices";
import { loginAction } from "../../redux/slice/authSlice";
import AlertMessage from "../../components/Alert/Alert";

// ========================
// Validation Schema
// ========================
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ========================
  // Mutation
  // ========================
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  // ========================
  // Formik
  // ========================
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await mutateAsync(values);

        if (!data || !data.token) throw new Error("Login failed");

        // Save token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data));

        // Dispatch Redux action
        dispatch(loginAction(data));
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  // ========================
  // Redirect after login
  // ========================
  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, [isSuccess, navigate]);

  return (
    <section className="login-page">
      <input type="text" id="login-search" placeholder="Login" />
      <img src={ribbon} alt="ribbon" className="ribbon1" />
      <img src={ribbon} alt="ribbon" className="ribbon2" />
      <div className="login-main">
        <form onSubmit={formik.handleSubmit} className="login-form">
          {isPending && <AlertMessage type="loading" message="Logging you in..." />}
          {isError && <AlertMessage type="error" message={error?.message} />}
          {isSuccess && <AlertMessage type="success" message="Logged In Successfully" />}

          <label className="login-label">Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter email"
            className="login-input"
            {...formik.getFieldProps("email")}
          />
          <br />
          {formik.touched.email && formik.errors.email && (
            <span className="login-error">{formik.errors.email}</span>
          )}
          <br />
          <br />

          <label className="login-label">Password</label>
          <br />
          <input
            type="password"
            placeholder="********"
            className="login-input"
            {...formik.getFieldProps("password")}
          />
          <br />
          <br />
          {formik.touched.password && formik.errors.password && (
            <span className="login-error">{formik.errors.password}</span>
          )}
          <br />
          <br />

          <button type="submit" className="login-button">
            Submit
          </button>
          <p>
            Don't have an account? <a href="/register" className="login-link">Sign up here</a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
