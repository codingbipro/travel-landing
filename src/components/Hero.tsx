import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import SearchBar from './SearchBar';

const Hero = () => {
  const scrollToDestinations = () => {
    const element = document.getElementById('destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Discover Your Next
          <span className="block text-blue-400">Adventure</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Explore breathtaking destinations around the world. Create memories that last a lifetime with our curated travel experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToDestinations}
            className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <span>Start Exploring</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 border border-white/30 flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Watch Video</span>
          </button>
        </div>
      </div>
      
      <SearchBar />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;