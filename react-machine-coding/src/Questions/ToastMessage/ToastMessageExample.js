import React, { useEffect, useState } from "react";
import ToastComponent from "./ToastComponent";

const ToastMessageExample = () => {
  const [count, setCount] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showNewToast = () => {
    const message = `You clicked ${count + 1} times`;
    setToastMessage(message); // update content
    setShowToast(false);      // force reset
    setTimeout(() => setShowToast(true), 0); // show again after unmount
  };

  return (
    <>
      <button onClick={() => {
        setCount(prev => prev + 1);
        showNewToast();
      }}>
        Increase Count : {count}
      </button>
      <ToastComponent
        content={toastMessage}
        onClose={() => setShowToast(false)}
        showToast={showToast}
      />
    </>
  );
};

export default ToastMessageExample;
