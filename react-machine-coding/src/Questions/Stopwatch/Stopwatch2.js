import React, { useReducer, useRef, useState } from "react";

const Stopwatch2 = () => {
  const [timer, setTimer] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

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

  const totalSeconds = () =>
    timer.hour * 3600 + timer.minute * 60 + timer.second;

  const format = (vale) => String(vale).padStart(2, "0");

  const startTimer = () => {
    if (isRunning || totalSeconds() === 0) return;

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        const totalTime =
          prevTimer.hour * 3600 + prevTimer.minute * 60 + prevTimer.second;
        if (totalTime <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return { hour: 0, minute: 0, second: 0 };
        }
        const newTotal = totalTime - 1;
        return {
          hour: Math.floor(newTotal / 3600),
          minute: Math.floor((newTotal % 3600) / 60),
          second: newTotal % 60,
        };
      });
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimer({ hour: 0, minute: 0, second: 0 });
  };

  return (
    <div className="stop-watch-container">
      <div className="stopwatch">
        <div>
          <input
            type="number"
            placeholder="HH"
            value={timer.hour}
            onChange={(e) => handleTimeChange(e, "hour")}
          />
          :
          <input
            type="number"
            placeholder="MM"
            value={timer.minute}
            onChange={(e) => handleTimeChange(e, "minute")}
          />
          :
          <input
            type="number"
            placeholder="SS"
            value={timer.second}
            onChange={(e) => handleTimeChange(e, "second")}
          />
        </div>

        <div>
          <button onClick={startTimer} disabled={isRunning}>
            Start
          </button>
          <button onClick={resetTimer}>Reset</button>
        </div>

        <div className="time-display">
          {format(timer.hour)}:{format(timer.minute)}:{format(timer.second)}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch2;
