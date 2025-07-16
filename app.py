from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

# Set up app
current_dir = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__,
            static_folder='static',
            static_url_path='/static',
            template_folder='templates')
CORS(app)

# Print root path
print(f"📁 App root: {current_dir}")

# === Load model components ===
print("🔄 Loading ML model...")
try:
    model = joblib.load(os.path.join(current_dir, "saved_models/gradient_boosting_addiction_classifier.pkl"))
    scaler = joblib.load(os.path.join(current_dir, "saved_models/feature_scaler.pkl"))
    encoders = joblib.load(os.path.join(current_dir, "saved_models/label_encoders.pkl"))
    feature_info = joblib.load(os.path.join(current_dir, "saved_models/model_info.pkl"))
    print("✅ Model loaded successfully!")
    MODEL_LOADED = True
except Exception as e:
    print(f"❌ Model load failed: {e}")
    MODEL_LOADED = False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/predict', methods=['POST'])  # <-- This must exist!
def predict():
    try:
        print("📩 /api/predict POST called")
        data = request.get_json(force=True)

        print(f"📊 Received keys: {list(data.keys())}")
        
        # MOCK prediction for now
        risk_score = 0.65

        return jsonify({
            'success': True,
            'risk_probability': risk_score,
            'risk_class': 1,
            'risk_level': 'HIGH',
            'feature_importance': [
                {'feature': 'Anxiety Level', 'importance': 0.139},
                {'feature': 'Depression Level', 'importance': 0.132},
                {'feature': 'Sleep Hours', 'importance': 0.130},
                {'feature': 'Phone Checks Per Day', 'importance': 0.126},
                {'feature': 'Daily Usage Hours', 'importance': 0.119}
            ],
            'recommendations': [
                {
                    'category': 'Sleep',
                    'icon': '🌙',
                    'title': 'Digital Sunset',
                    'description': 'No screens before bed.',
                    'priority': 'medium'
                }
            ]
        })

    except Exception as e:
        import traceback
        print("❌ Predict error:", traceback.format_exc())
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    print("🚀 AI Teen Addiction App Running...")
    app.run(debug=True, host='127.0.0.1', port=5000)
