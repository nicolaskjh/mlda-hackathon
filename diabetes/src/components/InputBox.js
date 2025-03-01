import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card } from "./ui/Card";
import { CardContent } from "./ui/CardContent";
import { motion } from "framer-motion";

export function InputBox() {
  const [inputs, setInputs] = useState({
    bloodPressure: "",
    bmi: "",
    age: "",
    pregnancies: "",
  });
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({}); // To store validation errors
  const [userInputData, setUserInputData] = useState(null); // To store user input data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    // Clear errors when the user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const validateInputs = () => {
    const newErrors = {};

    // Validate Blood Pressure (must be a number and >= 0)
    if (!/^-?\d*\.?\d+$/.test(inputs.bloodPressure)) {
      newErrors.bloodPressure = "Blood Pressure must be a number.";
    } else if (parseFloat(inputs.bloodPressure) < 0) {
      newErrors.bloodPressure = "Blood Pressure must be greater than or equal to 0.";
    }

    // Validate BMI (must be a number and >= 0)
    if (!/^-?\d*\.?\d+$/.test(inputs.bmi)) {
      newErrors.bmi = "BMI must be a number.";
    } else if (parseFloat(inputs.bmi) < 0) {
      newErrors.bmi = "BMI must be greater than or equal to 0.";
    }

    // Validate Age (must be a number and >= 0)
    if (!/^-?\d*\.?\d+$/.test(inputs.age)) {
      newErrors.age = "Age must be a number.";
    } else if (parseFloat(inputs.age) < 0) {
      newErrors.age = "Age must be greater than or equal to 0.";
    }

    // Validate Pregnancies (must be a number and >= 0)
    if (!/^-?\d*\.?\d+$/.test(inputs.pregnancies)) {
      newErrors.pregnancies = "Pregnancies must be a number.";
    } else if (parseFloat(inputs.pregnancies) < 0) {
      newErrors.pregnancies = "Pregnancies must be greater than or equal to 0.";
    }

    // Set errors if any
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handlePredict = () => {
    // Validate inputs before proceeding
    if (!validateInputs()) {
      return; // Stop if validation fails
    }

    // Collect user input data
    const userData = {
      bloodPressure: parseFloat(inputs.bloodPressure),
      bmi: parseFloat(inputs.bmi),
      age: parseFloat(inputs.age),
      pregnancies: parseFloat(inputs.pregnancies),
    };

    // Store user input data
    setUserInputData(userData);

    // Placeholder: Normally, you'd send inputs to a backend ML model
    const randomResult = Math.random() > 0.5 ? "High Risk" : "Low Risk";
    setResult(randomResult);
  };

  return (
    <div className="input-card">
      <CardContent>
        <h2>Enter Your Details</h2>
        <div className="space-y-4">
          {/* Blood Pressure Input */}
          <div className={`input-group ${errors.bloodPressure ? "error" : ""}`}>
            <label>Blood Pressure</label>
            <Input
              type="number"
              placeholder="Enter blood pressure"
              name="bloodPressure"
              value={inputs.bloodPressure}
              onChange={handleChange}
            />
            <p className="error-message">{errors.bloodPressure}</p>
          </div>

          {/* BMI Input */}
          <div className={`input-group ${errors.bmi ? "error" : ""}`}>
            <label>BMI</label>
            <Input
              type="number"
              placeholder="Enter BMI"
              name="bmi"
              value={inputs.bmi}
              onChange={handleChange}
            />
            <p className="error-message">{errors.bmi}</p>
          </div>

          {/* Age Input */}
          <div className={`input-group ${errors.age ? "error" : ""}`}>
            <label>Age</label>
            <Input
              type="number"
              placeholder="Enter age"
              name="age"
              value={inputs.age}
              onChange={handleChange}
            />
            <p className="error-message">{errors.age}</p>
          </div>

          {/* Pregnancies Input */}
          <div className={`input-group ${errors.pregnancies ? "error" : ""}`}>
            <label>Pregnancies</label>
            <Input
              type="number"
              placeholder="Enter number of pregnancies"
              name="pregnancies"
              value={inputs.pregnancies}
              onChange={handleChange}
            />
            <p className="error-message">{errors.pregnancies}</p>
          </div>

          {/* Predict Button */}
          <Button onClick={handlePredict} className="button">
            Check Risk
          </Button>
        </div>
      </CardContent>

      {/* Result Modal */}
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="modal-overlay"
        >
          <Card className="modal-content">
            <CardContent>
              <h3>Prediction Result</h3>
              <p>
                Your risk level: <span className="font-bold">{result}</span>
              </p>
              <Button onClick={() => setResult(null)} className="button mt-4">
                Close
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}