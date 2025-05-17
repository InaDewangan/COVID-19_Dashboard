import React from 'react';
import { useNavigate } from 'react-router-dom'
import './FrontPage.css';
import backgroundImage from '../assets/fron-page.jpeg';
const FrontPage = () => {
    const navigate = useNavigate();
    return (
        <div
            className="front-page"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="overlay" />
            <div className="content">
                <h1>COVID-19 Dashboard</h1>
                <p>Stay informed with real-time statistics and health guidelines.</p>
                <div className="buttons">
                    <button className="btn" onClick={() => navigate("/signup")}>Sign Up</button>
                    <button className="btn" onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;
