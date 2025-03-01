import torch
import torch.nn as nn
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import joblib
import numpy as np
import logging
import pickle

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load the Transformer model
class DiabetesTransformer(nn.Module):
    def __init__(self, input_dim, d_model, nhead, num_layers):
        super(DiabetesTransformer, self).__init__()
        self.embedding = nn.Linear(input_dim, d_model)
        self.transformer = nn.TransformerEncoder(
            nn.TransformerEncoderLayer(d_model, nhead, batch_first = True),
            num_layers
        )
        self.fc = nn.Linear(d_model, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        x = self.embedding(x).unsqueeze(0)  
        x = self.transformer(x)
        x = self.fc(x.squeeze(0))
        return self.sigmoid(x).squeeze(-1)

input_dim = 4  
d_model = 32
nhead = 2
num_layers = 2

MODEL_PATH = "diabetes_transformer_model.pth"
SCALER_PATH = "diabetes_scaler.pkl"

device = torch.device("cpu")

try:
    model = DiabetesTransformer(input_dim, d_model, nhead, num_layers).to(device)
    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
    model.eval()
    with open(SCALER_PATH, 'rb') as f:
        scaler = pickle.load(f)
    model.eval()
except Exception as e:
    logger.error(f"Error loading Transformer model: {e}")
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
            data['pregnancies'],
            data['age'],
            data['bmi'],
            data['bloodPressure']
        ]).reshape(1, -1)

        # Make prediction using the Transformer model
        logger.info(input_data)
        input_data = pd.DataFrame(input_data, columns = ['Pregnancies', 'Age', 'BMI', 'BloodPressure'])
        input_scaled = scaler.transform(input_data)
        input_tensor = torch.FloatTensor(input_scaled).to(device)
        with torch.no_grad():
            risk = model(input_tensor)
        # Return prediction
            logger.info(risk.item())
            return jsonify({
                'prediction': risk.item()  # 1 for High Risk, 0 for Low Risk
            })
    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

if __name__ == '__main__':
    app.run(debug=True)
