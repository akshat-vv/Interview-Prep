import React, { useState, useEffect } from "react";
import ToastComponent from "./ToastComponent";

const ToastQueueExample = () => {
  const [queue, setQueue] = useState([]);
  const [currentToast, setCurrentToast] = useState(null);

  // Whenever queue updates and no toast is showing, show the next
  useEffect(() => {
    console.log(queue, {currentToast});
    if (!currentToast && queue.length > 0) {
      setCurrentToast(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [queue, currentToast]);

  const addToast = (message) => {
    console.log("ADDING");
    setQueue(prev => [...prev, message]);
  };

  const handleClose = () => {
    setCurrentToast(null); // this triggers the useEffect to show the next toast
  };

  return (
    <div>
      <h2>Toast Queue Example</h2>
      <button onClick={() => addToast("You clicked toast at " + new Date().toLocaleTimeString())}>
        Add Toast
      </button>
      <button onClick={() => {
        addToast("✅ Success message");
        addToast("⚠️ Warning message");
        addToast("🚨 Error message");
      }}>
        Add Multiple Toasts
      </button>

      {currentToast && (
        <ToastComponent content={currentToast} onClose={handleClose} />
      )}
    </div>
  );
};

export default ToastQueueExample;
