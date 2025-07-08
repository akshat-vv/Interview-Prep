import React, { useEffect, useRef, useState } from "react";
import "./watch.css";

const Stopwatch = () => {
  const [timer, setTimer] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const intervalRef = useRef(null);

  const [isRunning, setIsRunning] = useState(false);

  const handleTimeChange = (e, field) => {
    const value = parseInt(e.target.value, 10) || 0;
    const newTimer = { ...timer };
    newTimer[field] = value;

    newTimer.minute += Math.floor(newTimer.second / 60);
    newTimer.second = newTimer.second % 60;

    newTimer.hour += Math.floor(newTimer.minute / 60);
    newTimer.minute = newTimer.minute % 60;

    setTimer(newTimer);
  };

  const handleStart = () => {
    if (
      timer.hour.length === 0 &&
      timer.minute.length === 0 &&
      timer.second.length === 0
    ) {
      return;
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          const copyTimer = { ...prevTimer };
          copyTimer.second--;

          if (copyTimer.second < 0) {
            copyTimer.minute--;
            copyTimer.second = 59;
            if (copyTimer.minute < 0) {
              copyTimer.hour--;
              copyTimer.minute = 59;

              if (copyTimer.hour < 0) {
                clearInterval(intervalRef.current)
                return { hour: 0, minute: 0, second: 0 };
              }
            }
          }

          return copyTimer;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimer({ hour: 0, minute: 0, second: 0 });
  };

  return (
    <div className="stop-watch-container">
      <div className="stopwatch">
        <div>
          <input
            type="text"
            placeholder="HH"
            value={timer.hour}
            onChange={(e) => handleTimeChange(e, "hour")}
          />
          :
          <input
            type="text"
            placeholder="MM"
            value={timer.minute}
            onChange={(e) => handleTimeChange(e, "minute")}
          />
          :
          <input
            type="text"
            placeholder="SS"
            value={timer.second}
            onChange={(e) => handleTimeChange(e, "second")}
          />
        </div>

        <div>
          <button onClick={() => handleStart()}>
            {isRunning ? "PAUSE" : "START"}
          </button>
          <button onClick={() => handleReset()}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
