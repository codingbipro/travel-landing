// Performance monitoring utilities
export const measurePerformance = () => {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      // Page load metrics
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      
      // Network metrics
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      request: navigation.responseStart - navigation.requestStart,
      response: navigation.responseEnd - navigation.responseStart,
      
      // Total time
      totalTime: navigation.loadEventEnd - navigation.navigationStart,
    };
  }
  return null;
};

// Image lazy loading observer
export const createImageObserver = () => {
  if ('IntersectionObserver' in window) {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100');
          }
        }
      });
    });
  }
  return null;
};

// Web Vitals tracking
export const trackWebVitals = () => {
  if ('web-vitals' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};