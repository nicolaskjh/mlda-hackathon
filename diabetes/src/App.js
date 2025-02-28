import { useState } from "react";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { Card } from "./components/ui/Card";
import { CardContent } from "./components/ui/CardContent";
import { motion } from "framer-motion";

export default function DiabetesPredictor() {
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
    // Placeholder: Normally, you'd send inputs to a backend ML model
    const randomResult = Math.random() > 0.5 ? "High Risk" : "Low Risk";
    setResult(randomResult);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="p-6 w-full max-w-md shadow-lg">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Diabetes Predictor</h2>
          <div className="space-y-4">
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
            <Button onClick={handlePredict} className="w-full">Predict</Button>
          </div>
        </CardContent>
      </Card>
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
        >
          <Card className="p-6 w-full max-w-sm bg-white shadow-lg">
            <CardContent>
              <h3 className="text-lg font-semibold">Prediction Result</h3>
              <p className="text-gray-700 mt-2">Your risk level: <span className="font-bold">{result}</span></p>
              <Button onClick={() => setResult(null)} className="mt-4 w-full">Close</Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
