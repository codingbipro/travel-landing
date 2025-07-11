import React from 'react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
        },
        success: {
          style: {
            background: '#10b981',
          },
        },
        error: {
          style: {
            background: '#ef4444',
          },
        },
      }}
    />
  );
};

export default Toast;