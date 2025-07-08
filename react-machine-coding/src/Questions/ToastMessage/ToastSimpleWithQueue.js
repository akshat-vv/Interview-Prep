import React, { useRef, useState } from "react";

const ToastComponent = ({ message = "Info Message", type = "info", onClose }) => {
  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
      <span onClick={onClose}>x</span>
    </div>
  );
};

const ToastSimpleWithQueue = () => {
  const [toastData, setToastData] = useState([]);
  const timeoutRef = useRef({});
  const idRef = useRef(0); // Unique ID generator

  const handleAdd = (message, type) => {
    const id = idRef.current++;
    setToastData((prev) => [...prev, { id, message, type }]);

    timeoutRef.current[id] = setTimeout(() => handleClose(id), 3000);
  };

  const handleClose = (id) => {
    if (timeoutRef.current?.[id]) {
      clearTimeout(timeoutRef.current[id]);
      delete timeoutRef.current[id];
    }
    setToastData((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div>
      <div className="toast-messages">
        {toastData.map((toast) => (
          <ToastComponent
            key={toast.id} // 💡 required to avoid React warnings
            message={toast.message}
            type={toast.type}
            onClose={() => handleClose(toast.id)}
          />
        ))}
      </div>
      <button onClick={() => handleAdd("Success Message", "success")}>Success Toast</button>
      <button onClick={() => handleAdd("Warning Message", "warning")}>Warning Toast</button>
      <button onClick={() => handleAdd("Info Message", "info")}>Info Toast</button>
      <button onClick={() => handleAdd("Error Message", "error")}>Error Toast</button>
    </div>
  );
};

export default ToastSimpleWithQueue;
