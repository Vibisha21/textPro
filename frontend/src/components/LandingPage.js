import React from 'react';

const LandingPage = ({ onStart }) => {
    return (
        <div className="landing-container">
            <div className="logo-container">
                <img src="/logo.png" alt="TextPro Logo" className="logo-image" />
            </div>
            <h1 className="landing-title">TextPro</h1>
            <p className="landing-subtitle">
                Elevate your communication. Transform informal text into professional
                masterpieces for office and academics with just one click.
            </p>
            <button className="start-btn" onClick={onStart}>
                Start Transformation
            </button>
        </div>
    );
};

export default LandingPage;
