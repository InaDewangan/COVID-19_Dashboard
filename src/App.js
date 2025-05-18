import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import FrontPage from './pages/FrontPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CovidDashboard from './pages/CovidDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); //state to wait for Firebase auth check

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return <div>Loading...</div>; //Show a loading screen during refresh
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={currentUser ? <Navigate to="/covidashboard" /> : <LoginPage />} />
        <Route
          path="/covidashboard"
          element={
            currentUser ? (
              <CovidDashboard currentUser={currentUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
