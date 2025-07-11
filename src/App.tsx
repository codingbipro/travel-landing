import React from 'react';
import Toast from './components/Toast';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import { useAnalytics } from './hooks/useAnalytics';

function App() {
  useAnalytics();
      <Toast />

  return (
    <HelmetProvider>
      <div className="min-h-screen">
        <SEOHead />
        <Navigation />
        <Hero />
        <Destinations />
        <Testimonials />
        <Newsletter />
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;