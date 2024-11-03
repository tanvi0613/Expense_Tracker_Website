import React from 'react'
import './topNav.css'
//import { useSelector } from 'react-redux';
import { signout } from '../../utils/icons'
import avatar2 from '../../img/avatar2.png'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../../redux/slice/authSlice'


function TopNav() {

  // Fetch data from localStorage
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

// Check if userInfo exists and access the username
const username = userInfo ? userInfo.username : null;


  //dispatch
  const dispatch = useDispatch();
  //logout handler
  const logoutHandler = () => {
    dispatch(logoutAction());
    //remove the user from storage
    localStorage.removeItem('userInfo');
  }

  return (
    <div className='TopNav'>
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
