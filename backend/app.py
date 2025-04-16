from flask import Flask
from flask_cors import CORS
from routes import main
import os
import gdown

# === FIXED: Correct path inside the app directory ===
model_path = "models/food101_convnext_tiny_finetuned.pth"
drive_url = "https://drive.google.com/uc?id=1UsT2ZAKBS-1PnlrFb9b2QF3yoVT_HugF"

if not os.path.exists(model_path):
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    print("Downloading model from Google Drive...")
    gdown.download(drive_url, model_path, quiet=False)
# ===================================================

app = Flask(__name__)
CORS(app)

app.register_blueprint(main)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # ✅ Railway will set this
    app.run(debug=False, host="0.0.0.0", port=port)  # ✅ Must bind to 0.0.0.0
