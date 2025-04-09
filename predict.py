# predict.py

import torch
from torchvision import transforms
from PIL import Image
import json
import os

# Load class names
with open("utils/food101_classes.json", "r") as f:
    idx_to_class = json.load(f)

# Load metadata
with open("utils/food101_metadata.json", "r") as f:
    metadata = json.load(f)

# Image transforms (should match your training transforms)
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# Load model
def load_model(model_path="models/food101_convnext_tiny_finetuned.pth"):
    from torchvision.models import convnext_tiny
    model = convnext_tiny()
    model.classifier[2] = torch.nn.Linear(model.classifier[2].in_features, 101)
    model.load_state_dict(torch.load(model_path, map_location="cpu"), strict=False)
    model.eval()
    return model

# Predict class
def predict(image_path, model):
    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0)  # Add batch dimension
    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
        class_idx = predicted.item()
        class_name = idx_to_class[class_idx]

    print(f"\n🍽️ Predicted class: {class_name}")

    # Show food metadata
    if class_name in metadata:
        info = metadata[class_name]
        print("\n📊 Food Information:")
        print(f"✅ Calories: {info['calories']} kcal")
        print(f"✅ Nutrients: {info['nutrients']}")
        print(f"✅ Veg/Non-Veg: {'Vegetarian' if info['vegetarian'] else 'Non-Vegetarian'}")
        print(f"✅ Recipe: {info['recipe']}")
    else:
        print("❌ No metadata found for this class.")

    return class_name
