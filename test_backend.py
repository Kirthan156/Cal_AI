import requests

url = "http://127.0.0.1:5000/predict"
image_path = "test_images/ravi.jpg"

with open(image_path, "rb") as img_file:
    files = {"image": img_file}
    response = requests.post(url, files=files)

print("Status Code:", response.status_code)
print("Response:", response.json())
