import React from 'react';
import { useNavigate } from 'react-router-dom'; // Used to navigate between routes
import './FrontPage.css'; // Importing CSS for styling
import backgroundImage from '../assets/fron-page.jpeg'; // Importing background image

const FrontPage = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate between pages

    return (
        <div
            className="front-page"
            style={{ backgroundImage: `url(${backgroundImage})` }} // Set background image
        >
            <div className="overlay" /> {/* Semi-transparent overlay on the background */}
            <div className="content"> {/* Main content container */}
                <h1>COVID-19 Dashboard</h1>
                <p>Stay informed with real-time statistics and health guidelines.</p>

                <div className="buttons"> {/* Buttons for user actions */}
                    <button className="btn" onClick={() => navigate("/signup")}>
                        Sign Up
                    </button>
                    <button className="btn" onClick={() => navigate("/login")}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;
