import React, { useEffect } from 'react'
import './Register.css'
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import ribbon from '../../img/ribbon.png'
import { registerAPI } from '../../services/users/userServices';
import AlertMessage from '../../components/Alert/Alert';


//Validations
const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required")
});


function Register() {

    //Navigate
    const navigate = useNavigate();

    // Mutation
    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: registerAPI,
        mutationKey: ["register"],
    });

    const formik = useFormik({
        initialValues: {
        email: "",
        password: "",
        username: "",
        },
        // Validations
        validationSchema,
        //Submit
        onSubmit: (values) => {
        console.log(values);
        //http request
        mutateAsync(values)
            .then((data) => {
            console.log(data);
            })
            .catch((e) => console.log(e));
        },
    });

    //Redirect
    useEffect(() => {
        setTimeout(() => {
        if (isSuccess) {
            navigate("/login");
        }
        }, 2000);
    }, [navigate, isSuccess]);

  return (
    <section className='login-page'>
        <input type='text' id='login-search' placeholder='Register'></input>
        <img src={ribbon} alt='ribbon' className='ribbon1'></img>
        <img src={ribbon} alt='ribbon' className='ribbon2'></img>
        <div className='login-main'>
            <form  onSubmit={formik.handleSubmit} className='register-form'>
                
                {isPending && <AlertMessage type="loading" message="Loading...." />}
                {isError && (<AlertMessage type="error" message={error.response.data.message} />)}
                {isSuccess && (<AlertMessage type="success" message="Registration success" />)}

                <label className='login-label'>Username</label><br/>
                <input type='text'
                placeholder='Enter username'
                className='login-input'
                {...formik.getFieldProps("username")}
                /><br/>
                {formik.touched.username && formik.errors.username && (
                <span className="text-xs text-red-500">{formik.errors.username}</span>
                )}<br/>

                <label className='login-label'>Email</label><br/>
                <input type='email'
                placeholder='Enter email'
                className='login-input'
                {...formik.getFieldProps("email")}
                /><br/>
                {formik.touched.email && formik.errors.email && (
                <span className="text-xs text-red-500">{formik.errors.email}</span>
                )}<br/>

                <label className='login-label'>Password</label><br/>
                <input type='password'
                placeholder='********'
                className='login-input'
                {...formik.getFieldProps("password")}
                /><br/>
                {formik.touched.password && formik.errors.password && (
                <span className="text-xs text-red-500">{formik.errors.password}</span>
                )}<br/><br/>

                <button type='submit' className='login-button'>Submit</button>
                <p>
                    Already have an account?{' '}
                    <a href="/login" className="login-link">Login here</a>
                </p>
            </form>
        </div>
        </section>
  )
}

export default Register
