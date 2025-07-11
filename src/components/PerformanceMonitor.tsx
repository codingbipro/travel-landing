import React, { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Monitor page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      console.log('Performance Metrics:', {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.navigationStart,
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;