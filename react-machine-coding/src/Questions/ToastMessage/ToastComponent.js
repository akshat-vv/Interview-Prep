import { useEffect } from "react";
import ReactDOM from "react-dom";
import "./toast.css";

const ToastComponent = ({ content, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [content]);

  return ReactDOM.createPortal(
    <div className="toast-container" aria-live="polite">
      <div className="toast-content">{content}</div>
      <button onClick={onClose} className="toast-button">x</button>
    </div>,
    document.body
  );
};

export default ToastComponent;
