import React, { useEffect, useRef, useState } from 'react';

const TOTAL_BARS = 5;
const CONCURRENCY_LIMIT = 2;

const ConcurrentProgressBars = () => {
  const [progressList, setProgressList] = useState(
    Array(TOTAL_BARS).fill(0)
  );
  const runningRef = useRef(new Set());
  const timersRef = useRef({});

  // Start the next eligible bars if under concurrency limit
  const tryStartNext = () => {
    for (let i = 0; i < TOTAL_BARS; i++) {
      if (
        progressList[i] === 0 &&
        !runningRef.current.has(i) &&
        runningRef.current.size < CONCURRENCY_LIMIT
      ) {
        startProgress(i);
      }
    }
  };

  const startProgress = (index) => {
    runningRef.current.add(index);

    timersRef.current[index] = setInterval(() => {
      setProgressList((prev) => {
        const newProgress = [...prev];
        newProgress[index] += 10;

        if (newProgress[index] >= 100) {
          clearInterval(timersRef.current[index]);
          delete timersRef.current[index];
          newProgress[index] = 100;
          runningRef.current.delete(index);
          // Try starting the next one
          setTimeout(tryStartNext, 100);
        }

        return newProgress;
      });
    }, 300);
  };

  const handleStart = () => {
    tryStartNext(); // kick off the initial progress
  };

  return (
    <div>
      <button onClick={handleStart}>Start</button>
      {progressList.map((value, index) => (
        <div key={index} style={{ margin: '10px 0' }}>
          <div style={styles.container}>
            <div
              style={{
                ...styles.bar,
                width: `${value}%`,
              }}
            />
          </div>
          <span>{value}%</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '20px',
    background: '#ccc',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    background: 'green',
    transition: 'width 0.3s ease',
  },
};

export default ConcurrentProgressBars;
