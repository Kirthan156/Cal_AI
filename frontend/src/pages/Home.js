import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="overlay" />
      <div className="home-content">
        <h1 className="animated-title">🍽️ Food Calorie Estimator</h1>
        <div className="divider" />
        <p className="home-description">
          Upload a photo of your meal and get a detailed nutritional analysis including estimated calories,
          protein, fat, carbs, and a quick recipe.
        </p>
        <p className="home-description">
          Our AI model is trained on the Food-101 dataset using ConvNeXt architecture and can recognize 101 different food categories with high accuracy.
        </p>
      </div>
    </div>
  );
}

export default Home;
