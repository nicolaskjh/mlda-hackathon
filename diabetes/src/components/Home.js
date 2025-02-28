import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card } from "./ui/Card";
import { CardContent } from "./ui/CardContent";
import { motion } from "framer-motion";

export function Home() {
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
    <div className="app-container">
      <Card className="card">
        <CardContent>
          <h2>Diabetes Predictor</h2>
          <div className="">
            <Input
              type="number"
              placeholder="Blood Pressure"
              name="bloodPressure"
              value={inputs.bloodPressure}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="BMI"
              name="bmi"
              value={inputs.bmi}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Age"
              name="age"
              value={inputs.age}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Pregnancies"
              name="pregnancies"
              value={inputs.pregnancies}
              onChange={handleChange}
            />
            <Button onClick={handlePredict} className="button">Predict</Button>
          </div>
        </CardContent>
      </Card>
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="modal-overlay"
        >
          <Card className="modal-content">
            <CardContent>
              <h3>Prediction Result</h3>
              <p>Your risk level: <span className="font-bold">{result}</span></p>
              <Button onClick={() => setResult(null)} className="button">Close</Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}