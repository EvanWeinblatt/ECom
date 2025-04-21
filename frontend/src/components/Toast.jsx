import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ message, onClose, type = 'success' }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRemoving(true);
      setTimeout(() => {
        onClose();
      }, 300); // Wait for the removal animation to complete
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type} ${isRemoving ? 'removing' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

// ToastContainer component to manage multiple toasts
export const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast; 