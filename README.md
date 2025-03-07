# MLDA Deep Learning Hackathon
Problem Statement: Build an AI-centric, seamless, and adaptive solution that empowers individuals and transforms healthcare accessibility.

## Diabetes Risk Checker Web App
Our solution was to develop an AI model to predict patients who are at risk of diabetes based on factors such as blood pressure, BMI, age and past pregnancies.

We integrated the AI model into a full-stack web application for users to input their data, and get a prediction result out of it.

Currently, this product is a minimum viable product meant for testing of the model and its integration into the web app.
For future extensions, we will be looking to refine the model to produce more reliable results, as well as adding an insights page for patients to derive useful insights based on their risk level, such as potential diet and nutrition changes.

## Tech Stack
- React.js - Frontend
- Flask - Backend
- Python - Pandas, NumPy, Scikit-Learn and PyTorch to build our AI model

## Setup Instructions

### Prerequisites
Before you begin, ensure you have the following installed:

1. Python 3.8+: Required for the Flask backend. [Download from Python Official Website](https://www.python.org/downloads/)

2. Node.js and npm: Required for the React frontend. [Download from Node.js Official Website](https://nodejs.org/en)

### Setup Steps
1. Download a copy of the repository into your local device
2. Change working directory to app using ```cd app```
3. Run ```npm install``` and ```pip install flask flask-cors joblib scikit-learn```
4. Run ```npm run start-app``` script
5. Test the website!
