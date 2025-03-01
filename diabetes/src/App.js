import React from "react";
import { Home } from "./components/Home";
import "./App.css"; // Import the CSS file

export default function App() {
  return (
    <div className="app-container">
      <div className="header">
        <h1>Diabetes Predictor</h1>
      </div>
      <div className="main-content">
        <div className="text-box">
          <h2>Check Your Diabetes Risk Instantly!</h2>
          <p>
            Diabetes is a growing health concern, affecting millions worldwide. With rising cases and lifestyle factors playing a major role, 
            early detection is more important than ever. Our website offers a powerful, AI-driven diabetes risk assessment tool, allowing you 
            to check your likelihood of developing diabetes based on key health indicators like blood pressure, BMI, age, and pregnancy history.
          </p>
          <p>
            Simply enter your details, and our model will provide insights to help you take proactive steps toward a healthier future!
          </p>
        </div>
        <Home />
      </div>
    </div>
  );
}