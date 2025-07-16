# Youth Phone Addiction Classification Project

## Live Demo
[View the App Live](https://youth-phone-addiction-class-project.onrender.com)


This repository contains a complete machine learning web application designed to predict the likelihood of smartphone addiction in young individuals. The app is built with Flask for the backend and uses HTML, CSS, JavaScript, and Chart.js for the frontend.
It includes a trained classification model, multiple visualizations, and a form-based user interface for data input.

Features
Flask web server with modular structure
Machine learning pipeline using scikit-learn
Feature importance and prediction visualizations (D3.js + Chart.js)
Form-based input for psychological and behavioral data
Radar chart for mental health profile visualization
Real-time risk gauge with D3-based arc animation
Deployable to Render, Heroku, or any Flask-compatible service

To run locally:
git clone https://github.com/lupus-ML/youth_phone_addiction_class_project.git
cd youth_phone_addiction_class_project

# Recommended: Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py

The app will be available at http://localhost:5000

Model Details
The classification model is trained using behavioral and psychological features such as:

Sleep duration
Social interaction frequency
Anxiety and depression levels
Self-esteem rating
Academic and work-life satisfaction
The model outputs a risk probability score that is then visualized in the frontend.

Credits
Developed by Nikolas Antoniou

