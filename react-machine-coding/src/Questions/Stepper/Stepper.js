import React, { useState } from "react";
import "./stepper.css";

const Stepper = ({ steps }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="stepper-container">
      <div className="stepper">
        {steps.map((step, index) => (
          <div
            className="steps"
            style={{ marginRight: index !== steps.length - 1 ? 70 : 0 }}
            key={index}
          >
            <div className="pill-wrapper" style={{ marginRight: 0 }}
>
              <div
                className={`pill-content ${
                  index < currentIndex ? "done" : ""
                } ${index === currentIndex ? "active" : ""}`}
              >
                {index + 1}
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={`pill-line ${index < currentIndex ? "done" : ""}`}
                />
              )}
            </div>
            <div className="pill-label">{step.label}</div>
          </div>
        ))}
      </div>

      <div className="stepper-content">{steps[currentIndex].content}</div>

      <div className="stepper-controllers">
        <button onClick={handleBack} disabled={currentIndex === 0}>
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
