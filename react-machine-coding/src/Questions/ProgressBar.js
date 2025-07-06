import React, { useState, useRef } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const startProgressbar = () => {
    // Prevent multiple intervals
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 100;
        }
        return prev + 20;
      });
    }, 1000);
  };
  
  const stopProgessBar=()=>{
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  return (
    <>
      <div className='progressBar' style={styles.container}>
        <span style={{...styles.textBar, color:  progress > 40 ? 'white' : 'black'}}>{progress}%</span>
        <div className='bar' style={{ ...styles.bar, transform:`translateX(${progress - 100}%)` }} />
      </div>
      <button onClick={startProgressbar} style={styles.button}>Start</button>
       <button onClick={stopProgessBar} style={styles.button}>Stop</button>
    </>
  );
};

const styles = {
    textBar:{
        position:'absolute',
        zIndex:100,
        left: "50%",
        
    },
  container: {
    width: '100%',
    height: '20px',
    background: '#eee',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  bar: {
    height: '100%',
    background: 'green',
    transition: 'transform 0.5s ease',
  },
  button: {
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ProgressBar;
