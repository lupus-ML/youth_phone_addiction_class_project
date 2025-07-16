
import joblib
import pandas as pd
import numpy as np

def load_addiction_model():
    """Load the complete trained model pipeline"""
    model = joblib.load("saved_models/gradient_boosting_addiction_classifier.pkl")
    scaler = joblib.load("saved_models/feature_scaler.pkl") 
    encoders = joblib.load("saved_models/label_encoders.pkl")
    feature_info = joblib.load("saved_models/model_info.pkl")
    return model, scaler, encoders, feature_info

def predict_addiction_risk(user_data):
    """
    Predict addiction risk for a new user
    user_data: dict with all 21 features
    """
    model, scaler, encoders, feature_info = load_addiction_model()
    
    # Convert to DataFrame
    df = pd.DataFrame([user_data])
    
    # Apply label encoding
    for cat_feature in feature_info['categorical_features']:
        if cat_feature in df.columns and cat_feature in encoders:
            df[cat_feature] = encoders[cat_feature].transform(df[cat_feature])
    
    # Ensure correct feature order
    df = df[feature_info['feature_names']]
    
    # Predict
    risk_probability = model.predict_proba(df)[0][1]
    risk_class = model.predict(df)[0]
    
    return {
        'risk_probability': float(risk_probability),
        'risk_class': int(risk_class),
        'risk_level': 'HIGH' if risk_probability > 0.5 else 'LOW'
    }
