import React from "react";
import { InputBox } from "./components/InputBox";
import { TextBox } from "./components/TextBox"
import "./App.css"; // Import the CSS file

export default function App() {
  return (
    <div className="app-container">
      <div className="header">
        <h1>Diabetes Predictor</h1>
      </div>
      <div className="main-content">
        <TextBox />
        <InputBox />
      </div>
    </div>
  );
}