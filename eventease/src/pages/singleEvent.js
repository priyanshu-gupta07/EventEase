import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../api/event/event';

const GeometricEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventById(id)
      .then(response => {
        setEvent(response.data);
        setTimeout(() => {
          setLoading(false);
         },1000) 
      })
      .catch(error => {
        console.error('Error fetching event:', error);
       setTimeout(() => {
        setLoading(false);
       }, 1000);
      });
  }, [id]);

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

  if (!event) {
    return <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#181717] to-[#333333] text-white">Event not found.</div>;
  }

  return (
    <div className="min-h-screen h-full bg-gradient-to-r from-[#353535] to-[#181717] text-white p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Left column */}
          <div className="space-y-4 md:space-y-8">
            {/* Event title */}
            <div className="transition-transform transform p-4 md:p-6 rounded-e-full shadow-2xl hover:scale-95">
              <h1 className="text-white text-2xl md:text-3xl">{event.title}</h1>
            </div>
            
            {/* Event image */}
            <div className="bg-blue-700 rounded-lg overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-auto max-h-64 md:max-h-96 object-cover" />
            </div>
            
            {/* Circular element */}
            <div className="transition-transform transform flex justify-center items-center w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto shadow-2xl hover:scale-110">
              <button className="text-blue-200 font-semibold py-2 px-4 md:py-3 md:px-8 rounded-full transition-colors">
                  Book Now
              </button>
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-4 md:space-y-8">
            {/* Event information */}
            <div className="transition-transform transform p-4 md:p-6 rounded-3xl shadow-2xl hover:scale-95">
              <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Event Information</h2>
              <ul className="space-y-1 md:space-y-2">
                <li>When: {new Date(event.date).toLocaleDateString()}</li>
                <li>Where: {event.location}</li>
                <li>Price: ${event.price}</li>
                <li>Available Seats: {event.AvailableSeats}</li>
                <li>Booked Seats: {event.bookedSeats}</li>
              </ul>
            </div>
            
            {/* Description */}
            <div className="transition-transform transform rounded-3xl shadow-2xl p-4 md:p-6 hover:scale-95">
              <h3 className="text-base md:text-lg font-semibold mb-2">Description</h3>
              <p className="text-sm md:text-base">{event.description}</p>
            </div>
            
            {/* Organizer information */}
            <div className="transition-transform transform rounded-3xl shadow-2xl p-4 md:p-6 hover:scale-95">
              <h3 className="text-base md:text-lg font-semibold mb-2">Organizer</h3> <p className="text-sm md:text-base">{event.organizer_email}</p>
              
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 ">
              {event.Tags && event.Tags.map((tag, index) => (
                <span key={index} className="transition-transform transform shadow-md px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm hover:scale-95">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeometricEvent;