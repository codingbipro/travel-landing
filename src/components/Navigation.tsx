import React, { useState } from 'react';
import { Menu, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollPosition';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollPosition, scrollDirection } = useScrollPosition();
  
  const isScrolled = scrollPosition > 50;
  const shouldHideNav = scrollDirection === 'down' && scrollPosition > 200;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
      }`}
      initial={{ y: 0 }}
      animate={{ y: shouldHideNav ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            <a href="/"><span className="text-xl font-bold text-gray-900">Wanderlust</span></a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('destinations')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Destinations
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('newsletter')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Newsletter
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
            <div className="px-4 py-2 space-y-2">
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('destinations')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
              >
                Destinations
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('newsletter')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
              >
                Newsletter
              </button>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;