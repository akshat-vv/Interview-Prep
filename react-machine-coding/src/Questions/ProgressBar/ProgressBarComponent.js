// ProgressBar.js
import React from "react";
import "./bar.css";

const ProgressBarComponent = ({ progress }) => {
  const translateX = 100 - progress; // e.g. 100% progress = translateX(0%)

  return (
    <div
      className="progress-bar-container"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
              <span className="progress-label">{progress}%</span>
      <div
        className="progress-bar-fill"
        style={{ transform: `translateX(-${translateX}%)` }}
      />
    </div>
  );
};

export default ProgressBarComponent;
