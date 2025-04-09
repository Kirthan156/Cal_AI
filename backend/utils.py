import torch
from torchvision import transforms
from PIL import Image
import json
import os

# Load class names and metadata
with open("../utils/food101_classes.json", "r") as f:
    idx_to_class = json.load(f)

with open("../utils/food101_metadata.json", "r") as f:
    metadata = json.load(f)

# Image transforms (should match your training settings)
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# Load ConvNeXt Tiny model
def load_model(model_path="../models/food101_convnext_tiny_finetuned.pth"):
    from torchvision.models import convnext_tiny
    model = convnext_tiny()
    model.classifier[2] = torch.nn.Linear(model.classifier[2].in_features, 101)
    model.load_state_dict(torch.load(model_path, map_location="cpu"), strict=False)
    model.eval()
    return model

# Predict class and return metadata
def predict_with_metadata(image_file, model):
    image = Image.open(image_file).convert("RGB")
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
        class_idx = predicted.item()
        class_name = idx_to_class[class_idx]

    item_meta = metadata.get(class_name, {})

    nutrients = item_meta.get("nutrients", {})
    return {
        "class": class_name,
        "calories": item_meta.get("calories", "Unknown"),
        "vegetarian": item_meta.get("vegetarian", False),
        "ingredients": item_meta.get("ingredients", []),
        "recipe": item_meta.get("recipe", "No recipe available."),
        "nutrients": {
            "carbs": nutrients.get("carbs", "Unknown"),
            "protein": nutrients.get("protein", "Unknown"),
            "fat": nutrients.get("fat", "Unknown")
        }
    }
