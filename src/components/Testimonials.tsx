import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'Amazing experience! The team helped us plan the perfect honeymoon in Santorini. Every detail was thoughtfully arranged.',
    trip: 'Santorini, Greece'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'San Francisco, USA',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'Incredible service and attention to detail. The Bali trip exceeded all expectations. Highly recommend!',
    trip: 'Bali, Indonesia'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Madrid, Spain',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'The Japan cultural tour was absolutely magical. Professional guides and seamless organization throughout.',
    trip: 'Kyoto, Japan'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-600/20" />
                <p className="text-gray-700 mb-4 pl-6">{testimonial.text}</p>
              </div>
              
              <div className="border-t pt-4">
                <span className="text-sm text-blue-600 font-medium">Trip: {testimonial.trip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;