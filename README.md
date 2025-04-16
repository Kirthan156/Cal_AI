# 🍱 AI-Based Food Calorie Estimator

An AI-powered application that estimates meal calories and nutritional content directly from food images using the magic of deep learning and computer vision. We've trained our system on the extensive Food-101 dataset and fine-tuned cutting-edge Convolutional Neural Network (CNN) models to achieve impressive accuracy in food classification.

## 📌 Project Highlights

- **🔍 Smart Prediction:** Accurately identifies the food class in an image using a carefully fine-tuned **ConvNeXt-Tiny** model.
- **📊 Nutritional Insights:** Provides detailed nutritional information for the predicted dish, including calories, protein, carbohydrates, fat content, a list of ingredients, and even a recipe!
- **🌐 Full-Stack Power:** Built with a robust full-stack architecture:
    - **🧠 Brains:** **PyTorch** and **Torchvision** handle the heavy lifting of model training and making predictions.
    - **🗣️ Backend:** **Flask** acts as the intelligent server, delivering predictions to the user.
    - **🎨 Looks:** **React.js** provides a smooth and interactive user interface for capturing and displaying results.
- **🏆 High Accuracy:** Boasts an **87% Top-1 Accuracy** on the challenging Food-101 test set, meaning it gets the top prediction right most of the time!

---

## 📂 Project Structure

calorie-estimator/
│
├── .venv/                   # Isolated environment for Python dependencies
├── dataset/                 # The Food-101 image dataset (if you have it locally)
├── models/                  # Where our trained PyTorch model lives
├── utils/                   # Helpful metadata like JSON files for nutritional info, recipes, etc.
├── frontend/                # The React.js code for the user interface
├── app.py                   # The Flask backend application
├── train.py                 # Script to train or fine-tune the model
├── predict.py               # Script used for making predictions with the model
└── README.md                # This overview document


---

## 🚀 How to Run

Get this calorie estimator up and running on your local machine with these simple steps:

### Backend (Flask)

```bash
cd calorie-estimator
python -m venv .venv
source .venv/bin/activate  # For macOS and Linux
# or
.venv\Scripts\activate  # For Windows
pip install -r requirements.txt
python app.py
Frontend (React)
Open a new terminal window and navigate to the frontend directory:

Bash

cd frontend
npm install
npm start
📥 Download Pretrained Model
To get started quickly, you'll need our pre-trained ConvNeXt-Tiny model, which already has an impressive 87% accuracy. You can download it from the link below:

[🔗 Download Model on Google Drive]
https://drive.google.com/file/d/1UsT2ZAKBS-1PnlrFb9b2QF3yoVT_HugF/view?usp=drive_link


Once downloaded, place the file inside the models/ directory and rename it as follows:

Bash

models/food101_convnext_tiny_finetuned.pth
📊 Example Prediction Output
Imagine you upload a picture and our AI works its magic! Here's an example of the kind of information you might see:

Class: Caesar Salad
Calories (per 100g): 180 kcal
Nutrients:
  Protein: 6g
  Carbs: 12g
  Fat: 13g
Vegetarian: ✅
Ingredients: Romaine lettuce, parmesan, croutons, caesar dressing...
Recipe: Chop lettuce, mix dressing, add toppings...
🛠️ Tech Stack
Here's a breakdown of the technologies that power this project:

Core AI:
Python
PyTorch
Torchvision
Backend:
Flask
Frontend:
React.js
HTML
CSS
JavaScript
Infrastructure & Tools:
Google Drive (for hosting the trained model)
GitHub + Git LFS (for managing code and large model files)
Dataset:
Food-101 Dataset
📃 License
This project is intended for educational and research purposes only.

👨‍💻 Developed By
Kirthan Vivek Gada

Data Science Intern, Prasuneet Pvt. Ltd.

Project ID: PST/MAR25/0752
