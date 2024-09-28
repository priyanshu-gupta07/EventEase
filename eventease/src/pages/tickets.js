import React, { useState, useEffect } from 'react';
import { getBookingsByUserId } from '../api/Bookings/booking';
import { Link } from 'react-router-dom';
import { Calendar, Clock, DollarSign, Users } from 'lucide-react';

const Event = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getBookingsByUserId(user.email)
      .then(response => {
        const sortedBookings = response.data.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
        setBookings(sortedBookings);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      });
  }, [user.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-white text-2xl font-bold mb-6 text-center">Your Booking Timeline</h2>
      <div className="relative flex flex-col items-center">
        {bookings.map((booking, index) => (
          <div key={booking._id} className="mb-8 flex flex-col items-center w-full z-10">
            <div className="z-20 flex items-center justify-center bg-gray-800 shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
            </div>
            <div className="mt-3 bg-gradient-to-r from-white to-gray-500 rounded-lg shadow-xl w-full max-w-md px-6 py-4">
              <h3 className="mb-3 font-bold text-gray-800 text-xl">{booking.event_name}</h3>
              <div className="text-sm leading-snug tracking-wide text-gray-700">
                <div className="flex items-center mb-1">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  {new Date(booking.event_date).toLocaleDateString()}
                </div>
                <div className="flex items-center mb-1">
                  <Clock className="w-4 h-4 mr-2 text-green-500" />
                  {booking.booking_status}
                </div>
                <div className="flex items-center mb-1">
                  <Users className="w-4 h-4 mr-2 text-purple-500" />
                  Seats: {booking.seat_no.join(', ')}
                </div>
                <div className="flex items-center mb-3">
                  <DollarSign className="w-4 h-4 mr-2 text-yellow-500" />
                  ${booking.Amount_paid}
                </div>
                <Link to={`/event/${booking.event_id}`} className="inline-block w-full">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1">
                    View Event Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute h-full w-1 bg-gray-300 left-1/2 transform -translate-x-1/2" style={{ top: '20px' }}></div>
      </div>
    </div>
  );
};

export default Event;