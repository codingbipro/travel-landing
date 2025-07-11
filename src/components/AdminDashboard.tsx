import React, { useState, useEffect } from 'react';
import { Users, Mail, Calendar, TrendingUp, Eye, EyeOff } from 'lucide-react';

export type BookingInquiry = {
  id: string;
  destination: string;
  email: string;
  check_in: string;
  check_out: string;
  guests: number;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  submitted_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  submitted_at: string;
};


const AdminDashboard = () => {
  const [bookings, setBookings] = useState<BookingInquiry[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'contacts'>('bookings');
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if (showDashboard) {
      loadData();
    }
  }, [showDashboard]);

  // const loadData = async () => {
  //   try {
  //     setLoading(true);
  //     const [bookingData, contactData] = await Promise.all([
  //       getBookingInquiries(),
  //       getContactSubmissions()
  //     ]);
  //     setBookings(bookingData || []);
  //     setContacts(contactData || []);
  //   } catch (error) {
  //     console.error('Error loading admin data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleStatusUpdate = async (id: string, status: BookingInquiry['status']) => {
  //   try {
  //     await updateBookingStatus(id, status);
  //     setBookings(prev => 
  //       prev.map(booking => 
  //         booking.id === id ? { ...booking, status } : booking
  //       )
  //     );
  //   } catch (error) {
  //     console.error('Error updating booking status:', error);
  //   }
  // };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!showDashboard) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowDashboard(true)}
          className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
          title="Show Admin Dashboard"
        >
          <Eye className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <button
            onClick={() => setShowDashboard(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <EyeOff className="h-6 w-6" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-b">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-blue-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-blue-900">{bookings.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Mail className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-green-600">Contact Messages</p>
                    <p className="text-2xl font-bold text-green-900">{contacts.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-600">Pending Items</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {bookings.filter(b => b.status === 'pending').length + 
                       contacts.filter(c => c.status === 'new').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'bookings'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Booking Inquiries ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'contacts'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Contact Messages ({contacts.length})
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {activeTab === 'bookings' ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{booking.destination}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Email:</strong> {booking.email}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Dates:</strong> {booking.check_in} to {booking.check_out}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Guests:</strong> {booking.guests}
                          </p>
                          {booking.message && (
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Message:</strong> {booking.message}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            Submitted: {formatDate(booking.submitted_at)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusUpdate(booking.id, e.target.value as BookingInquiry['status'])}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  {bookings.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No booking inquiries yet.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                              {contact.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Email:</strong> {contact.email}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Message:</strong> {contact.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            Submitted: {formatDate(contact.submitted_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No contact messages yet.</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;