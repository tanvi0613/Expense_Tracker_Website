import React from 'react';
import './Home.css';
import phone from '../../img/phone.png';
import logo from '../../img/logo.png';
import grayele1 from '../../img/grayele1.png';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <>
        <section className='Landing'>
            <div className="main">
                <div className="left">
                <img src={logo} id="logo" alt="logo" />
                <div className='mid-home'>
                    <img src={grayele1} id="grayele1" alt="grayele1" />
                    <p className="heading"><span>Track your</span><br />expenses</p>
                </div>
                <p className="tagline"><span>Effortlessly manage your finances and stay on top of your expenses.</span></p>
                <div className="btns">
                    <Link to="/login">
                        <button className="landing-btn">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="landing-btn">Signup</button>
                    </Link>
                </div>
                </div>
                <div className="side">
                
                <img src={phone} alt="phone" className='phone'/>
                </div>
            </div>
        </section>
        <footer>
            <div className="marquee">
            <div className="footer-content">
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
                Save your time . Transform your ordinary finance into digital one . Share money across the whole family . Tracking expenses has never been so encouraging .
            </div>
            </div>
        </footer>
    </>
  );
}

export default Landing;
