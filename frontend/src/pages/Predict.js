import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Predict.css';

function Predict() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handlePredict = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      setLoading(true);
      const API_URL = 'https://calai-production.up.railway.app' || 'http://localhost:5000';
      const response = await axios.post(`${API_URL}/predict`, formData);
      setPrediction(response.data);
      setError(null);
    } catch (err) {
      console.error("Prediction error:", err);
      setError('Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPercentage = (type) => {
    if (!prediction) return 0;
    const p = parseFloat(prediction.nutrients.protein.replace('g', '')) || 0;
    const f = parseFloat(prediction.nutrients.fat.replace('g', '')) || 0;
    const c = parseFloat(prediction.nutrients.carbs.replace('g', '')) || 0;
    const total = p * 4 + f * 9 + c * 4;
    if (total === 0) return 0;
    const map = {
      protein: (p * 4 / total) * 100,
      fat: (f * 9 / total) * 100,
      carbs: (c * 4 / total) * 100
    };
    return map[type].toFixed(1);
  };

  return (
    <div className="predict-container">
      <div className="predict-overlay">
        <div className="predict-content">
          <h2>Upload Food Image for Prediction</h2>
          <p>Drag and drop a food image or click below to select a file.</p>

          <div
            className="dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            <p>📂 Drag & Drop Image Here or Click to Upload</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>

          {previewUrl && (
            <div className="image-preview">
              <h3>Preview:</h3>
              <img src={previewUrl} alt="Selected food" />
              <button onClick={handlePredict} className="predict-btn">Predict</button>
            </div>
          )}

          {loading && <div className="loader"></div>}

          {error && <div className="error-msg">{error}</div>}

          {prediction && (
            <div className="result">
              <h3>Prediction Result:</h3>
              <p><strong>Food:</strong> {prediction.class}</p>
              <p><strong>Calories:</strong> {prediction.calories}</p>
              <p><strong>Vegetarian:</strong> {prediction.vegetarian ? 'Yes' : 'No'}</p>
              <p><strong>Ingredients:</strong> {prediction.ingredients.join(', ')}</p>
              <p><strong>Recipe:</strong> {prediction.recipe}</p>

              <p className="disclaimer"><em>All values are estimates per 100g of food.</em></p>

              <h4>Nutrition (g):</h4>
              <div className="nutrition-chart">
                {Object.entries(prediction.nutrients).map(([key, val]) => {
                  const numericVal = parseFloat(val.replace('g', '')) || 0;
                  return (
                    <div className="bar" key={key}>
                      <label>{key}</label>
                      <div className="bar-fill" style={{ width: `${numericVal * 4}px` }}>
                        {val}
                      </div>
                    </div>
                  );
                })}
              </div>

              <h4 style={{ marginTop: '30px' }}>Calories Distribution</h4>
              <div className="pie-chart-wrapper">
                <div
                  className="pie-chart"
                  style={{
                    background: `conic-gradient(
                      #4caf50 0% ${getPercentage('protein')}%, 
                      #f44336 ${getPercentage('protein')}% ${parseFloat(getPercentage('protein')) + parseFloat(getPercentage('fat'))}%, 
                      #2196f3 ${parseFloat(getPercentage('protein')) + parseFloat(getPercentage('fat'))}% 100%
                    )`
                  }}
                ></div>
                <div className="legend">
                  <p><span style={{ backgroundColor: '#4caf50' }}></span> Protein</p>
                  <p><span style={{ backgroundColor: '#f44336' }}></span> Fat</p>
                  <p><span style={{ backgroundColor: '#2196f3' }}></span> Carbs</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Predict;
