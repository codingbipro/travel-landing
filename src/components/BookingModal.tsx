import React, { useState } from 'react';
import { X, Calendar, Users, MapPin, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';


interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    name: string;
    price: string;
    image: string;
  };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, destination }) => {
  const [formData, setFormData] = useState({
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);
    try {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      toast.success('Booking inquiry submitted successfully!');
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          email: '',
          checkIn: '',
          checkOut: '',
          guests: 1,
          message: ''
        });
        onClose();
      }, 2000);
    } catch (error: any) {
      setIsSubmitting(false);
      setSubmitError(error?.response?.data?.error || error.message || 'Something went wrong. Please try again.');
      toast.error(error?.response?.data?.error || error.message || 'Something went wrong. Please try again.');
    }
  };

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Inquiry Sent!</h3>
              <p className="text-gray-600">
                Thank you for your interest in {destination.name}. We'll contact you within 24 hours to discuss your travel plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <motion.div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        
        <motion.div 
          className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Book Your Trip</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{destination.name}</h4>
                <p className="text-blue-600 font-medium">{destination.price}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <input
                  type="date"
                  required
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out
                </label>
                <input
                  type="date"
                  required
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Guests
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any special requirements or questions..."
              />
            </div>

            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{submitError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </motion.div>
      </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;