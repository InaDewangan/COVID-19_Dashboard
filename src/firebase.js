// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-xDXicsZ5UMwJmrYz0DO0W8AlqwNZCpE",
    authDomain: "covid-19-dashboard-fba34.firebaseapp.com",
    projectId: "covid-19-dashboard-fba34",
    storageBucket: "covid-19-dashboard-fba34.firebasestorage.app",
    messagingSenderId: "762625206381",
    appId: "1:762625206381:web:9f9c38a28089ae384db764",
    measurementId: "G-2R1FHST98P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
