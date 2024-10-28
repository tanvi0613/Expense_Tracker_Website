import React from 'react'
import './Register.css'
import ribbon from '../../img/ribbon.png'


function Register() {
  return (
    <section className='login-page'>
        <input type='text' id='login-search' placeholder='Register'></input>
        <img src={ribbon} alt='ribbon' className='ribbon1'></img>
        <img src={ribbon} alt='ribbon' className='ribbon2'></img>
        <div className='login-main'>
            <form className='register-form'>
                <label className='login-label'>Username</label><br/>
                <input type='text' placeholder='Enter username'  className='login-input'/><br/><br/>
                <label className='login-label'>Email</label><br/>
                <input type='text' placeholder='Enter email'  className='login-input'/><br/><br/>
                <label className='login-label'>Password</label><br/>
                <input type='password' placeholder='********'  className='login-input'/><br/><br/><br/>
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
