import React, { useState } from 'react';
import { MapPin, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import AnimatedSection from './AnimatedSection';
import BookingModal from './BookingModal';

const destinations = [
  {
    id: 1,
    name: 'Santorini, Greece',
    image: 'https://images.pexels.com/photos/161901/santorini-travel-island-161901.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    price: '$1,299',
    rating: 4.9,
    reviews: 1247,
    description: 'Experience the magic of white-washed buildings and stunning sunsets'
  },
  {
    id: 2,
    name: 'Bali, Indonesia',
    image: 'https://images.pexels.com/photos/2848492/pexels-photo-2848492.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    price: '$899',
    rating: 4.8,
    reviews: 2103,
    description: 'Discover tropical paradise with ancient temples and pristine beaches'
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    price: '$1,599',
    rating: 4.9,
    reviews: 856,
    description: 'Immerse yourself in traditional Japanese culture and stunning temples'
  },
  {
    id: 4,
    name: 'Machu Picchu, Peru',
    image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    price: '$1,199',
    rating: 4.7,
    reviews: 934,
    description: 'Trek through ancient Incan ruins high in the Andes Mountains'
  },
  {
    id: 5,
    name: 'Maldives',
    image: 'https://images.pexels.com/photos/934718/pexels-photo-934718.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    price: '$2,299',
    rating: 4.9,
    reviews: 1456,
    description: 'Relax in overwater bungalows surrounded by crystal-clear lagoons'
  },
  {
    id: 6,
    name: 'Iceland',
    image: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    price: '$1,699',
    rating: 4.8,
    reviews: 723,
    description: 'Witness the Northern Lights and explore dramatic volcanic landscapes'
  }
];


interface DestinationsProps {
  searchTerm?: string;
}

const Destinations: React.FC<DestinationsProps> = ({ searchTerm = '' }) => {
  const [favorites, setFavorites] = useLocalStorage<number[]>('travel-favorites', []);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const handleBookNow = (destination: any) => {
    setSelectedDestination(destination);
    setIsBookingModalOpen(true);
  };

  // Filter destinations by search term (case-insensitive, matches name or description)
  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="destinations" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our handpicked destinations that offer unforgettable experiences and breathtaking views
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <AnimatedSection
              key={destination.id}
              delay={index * 0.1}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <button
                  onClick={() => toggleFavorite(destination.id)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                >
                  <Heart
                    className={`h-5 w-5 ${favorites.includes(destination.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                  />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white font-semibold text-sm">{destination.price}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-600">{destination.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{destination.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{destination.reviews} reviews</span>
                  </div>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200"
                    onClick={() => handleBookNow(destination)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {selectedDestination && (
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            destination={selectedDestination}
          />
        )}
      </div>
    </section>
  );
};

export default Destinations;