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

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handlePredict = () => {
    const randomResult = Math.random() > 0.5 ? "High Risk" : "Low Risk";
    setResult(randomResult);
  };

  return (
    <div className="input-card">
      <CardContent>
        <h2>Enter Your Details</h2>
        <div className="space-y-4">
          <div className="input-group">
            <label>Blood Pressure</label>
            <Input
              type="number"
              placeholder="Enter blood pressure"
              name="bloodPressure"
              value={inputs.bloodPressure}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>BMI</label>
            <Input
              type="number"
              placeholder="Enter BMI"
              name="bmi"
              value={inputs.bmi}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Age</label>
            <Input
              type="number"
              placeholder="Enter age"
              name="age"
              value={inputs.age}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Pregnancies</label>
            <Input
              type="number"
              placeholder="Enter number of pregnancies"
              name="pregnancies"
              value={inputs.pregnancies}
              onChange={handleChange}
            />
          </div>
          <Button onClick={handlePredict} className="button">
            Check Risk
          </Button>
        </div>
      </CardContent>
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
              <Button onClick={() => setResult(null)} className="button">
                Close
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}