import React, { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import toast from 'react-hot-toast';


const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError('');
    
    // if (!email) {
    //   setError('Please enter your email address');
    //   return;
    // }
    
    // if (!isValidEmail(email)) {
    //   setError('Please enter a valid email address');
    //   return;
    // }

    // setIsLoading(true);
    
    // try {
    //   // Check if email is already subscribed
    //   const existingSubscription = await checkEmailSubscription(email);
      
    //   if (existingSubscription && existingSubscription.is_active) {
    //     toast.error('This email is already subscribed to our newsletter');
    //     setIsLoading(false);
    //     return;
    //   }
      
    //   // Subscribe to newsletter
    //   await subscribeToNewsletter(email);
      
    //   setIsLoading(false);
    //   setIsSubmitted(true);
    //   setEmail('');
    //   toast.success('Successfully subscribed to our newsletter!');
    // } catch (err: any) {
    //   setIsLoading(false);
    //   toast.error(err.message || 'Something went wrong. Please try again.');
    // }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (isSubmitted) {
    return (
      <section id="newsletter" className="py-16 md:py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Thank you for subscribing!
            </h2>
            <p className="text-gray-600 text-lg">
              You'll receive our latest travel deals and destination guides in your inbox.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 text-blue-600 hover:text-blue-700 font-medium"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="newsletter" className="py-16 md:py-24 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-3">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Never Miss a Deal
          </h2>
          
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Get exclusive travel deals, destination guides, and insider tips delivered straight to your inbox. 
            Join over 50,000 happy travelers!
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;