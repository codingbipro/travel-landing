import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const useAnalytics = () => {
  useEffect(() => {
    // Initialize Google Analytics
    const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
    
    if (GA_TRACKING_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script);

      window.gtag = function() {
        // eslint-disable-next-line prefer-rest-params
        (window as any).dataLayer = (window as any).dataLayer || [];
        // eslint-disable-next-line prefer-rest-params
        (window as any).dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', GA_TRACKING_ID);
    }
  }, []);

  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackPageView = (page_path: string) => {
    if (window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
        page_path,
      });
    }
  };

  return { trackEvent, trackPageView };
};