import React, { useState, useEffect } from 'react';
import { getevents } from '../api/event/event';
import { Link } from 'react-router-dom';

const Event = () => {
  const [events, setEvents] = useState([]); // State to store events
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch events when the component mounts
    getevents()
      .then(response => {
        setEvents(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  // Handle loading state with colorful animation
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-8 h-8 bg-red-500 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
      {events.map(event => (
        <div 
          key={event._id} 
          className="bg-gradient-to-br from-white to-black text-white shadow-lg rounded-lg p-4 flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-neon"
        >
          <div className="mb-4 w-full h-36 overflow-hidden rounded-lg">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
          <p className="text-gray-300 text-sm mb-4">Date: {new Date(event.date).toDateString()}</p>
          <Link to={`/event/${event._id}`}>
            <button className="mt-auto bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded">
              Know More
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Event;
