import React from 'react'
import './topNav.css'
//import { useSelector } from 'react-redux';
import { signout, updatePassword } from '../../utils/icons'
import avatar2 from '../../img/avatar2.png'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'


function TopNav() {

  // Fetch data from localStorage
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

// Check if userInfo exists and access the username
const username = userInfo ? userInfo.username : null;


  //dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //logout handler
  const logoutHandler = () => {
    dispatch(logoutAction());
    //remove the user from storage
    localStorage.removeItem('userInfo');
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  const handleUpdatePassword = () => {
    navigate('/update-password');
  };

  return (
    <div className='TopNav'>
      <div className='leftSide'>
      <li onClick={handleUpdatePassword}>{updatePassword}Update Password</li>
      </div>
      <div className='rightSide'>
        <img src={avatar2} alt="" className='avatar'/>
        <div className='text-topNav'>
            <h2>Hello, {username || "user"}</h2>
        </div>
        <div className='bottom-nav'>
            <li onClick={logoutHandler}>{signout}Sign Out</li>
        </div>
      </div>
    </div>
  )
}

export default TopNav
