from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import joblib
import numpy as np
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load the Random Forest model
try:
    random_forest_model = joblib.load('random_forest_model.pkl')
    logger.info("Random Forest model loaded successfully.")
except Exception as e:
    logger.error(f"Error loading Random Forest model: {e}")
    raise

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        data = request.json
        logger.debug(f"Received input data: {data}")

        # Validate input data
        if not all(key in data for key in ['bloodPressure', 'bmi', 'age', 'pregnancies']):
            logger.error("Missing required fields in input data.")
            return jsonify({"error": "Missing required fields."}), 400

        # Convert input data to numpy array
        input_data = np.array([
            data['bloodPressure'],
            data['bmi'],
            data['age'],
            data['pregnancies']
        ]).reshape(1, -1)

        # Make prediction using the Random Forest model
        random_forest_prediction = random_forest_model.predict(input_data)[0]
        logger.debug(f"Prediction result: {random_forest_prediction}")

        # Return prediction
        return jsonify({
            'prediction': int(random_forest_prediction)  # 1 for High Risk, 0 for Low Risk
        })
    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

if __name__ == '__main__':
    app.run(debug=True)