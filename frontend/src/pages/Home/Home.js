import React from 'react';
import './Home.css';
import phone from '../../img/phone.png';
import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <>
        <section className='Landing'>
            <div className="main">
                <div className="left">
                <img src={logo} id="logo" alt="logo" />
                <p className="heading">Track your<br />expenses</p>
                <p className="tagline">Effortlessly manage your finances and stay on top of your expenses.</p>
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
                <h3>
                    <button className="landing-btn2">Connect With Us</button>
                </h3>
                <img src={phone} alt="phone" />
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
