import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PerformanceMonitor />
      <App />
    </ErrorBoundary>
  </StrictMode>
);
