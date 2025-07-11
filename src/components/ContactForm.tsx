import React, { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setSubmitError('');
    // setIsSubmitting(true);

    // try {
    //   await submitContactForm(formData);
    //   setIsSubmitting(false);
    //   setSubmitSuccess(true);
      
    //   // Reset form
    //   setFormData({ name: '', email: '', message: '' });
      
    //   // Hide success message after 5 seconds
    //   setTimeout(() => {
    //     setSubmitSuccess(false);
    //   }, 5000);
    // } catch (error: any) {
    //   setIsSubmitting(false);
    //   setSubmitError(error.message || 'Something went wrong. Please try again.');
    // }
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600">
          Thank you for contacting us. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us about your travel plans or questions..."
          />
        </div>

        {submitError && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-600 text-sm">{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;