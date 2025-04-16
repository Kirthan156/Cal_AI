from flask import Flask
from flask_cors import CORS
from routes import main
import os
import gdown

# === NEW CODE to auto-download model if missing ===
model_path = "../models/food101_convnext_tiny_finetuned.pth"
drive_url = "https://drive.google.com/uc?id=1UsT2ZAKBS-1PnlrFb9b2QF3yoVT_HugF"

if not os.path.exists(model_path):
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    print("Downloading model from Google Drive...")
    gdown.download(drive_url, model_path, quiet=False)
# ===================================================

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.register_blueprint(main)

if __name__ == "__main__":
    app.run(debug=True)
