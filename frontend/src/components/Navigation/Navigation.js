import React from 'react';
import { Link } from 'react-router-dom';
import { menuItems } from '../../utils/MenuItems';
import './navigation.css';
import logo from '../../img/logo.png';
import ele4 from '../../img/ele4.png'

function Navigation({ active, setActive }) {
  return (
    <div className='Navigation'>
      <img src={logo} alt="logo" id="logo" />
      <div className='text'>
        <h2 className='profile-h2'>Tanvi</h2>
        <p className='profile-p'>Your Money</p>
      </div>
      <ul className='menu-items'>
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? 'active' : ''}
            >
              <Link to={item.link}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <img src={ele4} alt='grayele2' className='ele4' />
    </div>
  );
}

export default Navigation;
