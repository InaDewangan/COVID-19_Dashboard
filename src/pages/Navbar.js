import React from "react";
import { useNavigate } from 'react-router-dom'
import { auth } from "../firebase";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import "./Navbar.css";

const Navbar = ({ currentUser }) => {

    const navigate = useNavigate();

    // Avoid error if currentUser is not yet available
    if (!currentUser) return null;

    // Get user name
    const userEmail = currentUser.email;
    const user = userEmail.split('@');
    const userName = user[0].toUpperCase();

    // Logout
    const userLogout = async () => {
        if (!currentUser) return;

        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDelete) return;

        try {
            const email = currentUser.email;
            const password = prompt("Please re-enter your password to confirm:");

            if (!password) {
                alert("Password is required to delete the account.");
                return;
            }

            // Create credential
            const credential = EmailAuthProvider.credential(email, password);

            // Re-authenticate user
            await reauthenticateWithCredential(currentUser, credential);

            // Delete user
            await currentUser.delete();

            // Sign out and redirect
            await auth.signOut();
            alert("Account deleted and logged out successfully.");
            navigate("/signup");
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Error: " + error.message);
        }
    };

    return (
        <nav className="navbar" style={{ margin: "0 0 20px 0" }}>
            {/* Left side: User name */}
            <div className="navbar-left">
                Welcome, <strong>{userName}</strong>
            </div>

            {/* Right side: Logout button */}
            <div className="navbar-right">
                <button className="logout-button" onClick={userLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
