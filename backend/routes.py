from flask import Blueprint, request, jsonify
import torch
from utils import load_model, predict_with_metadata

main = Blueprint("main", __name__)

# Load model only once when the server starts
model = load_model()

# Health check route to ensure app is up
@main.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@main.route("/predict", methods=["POST"])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image = request.files['image']

    try:
        result = predict_with_metadata(image, model)
        print("Prediction result:", result)
        return jsonify(result)
    except Exception as e:
        print("Prediction error:", str(e))
        return jsonify({"error": "Prediction failed"}), 500
