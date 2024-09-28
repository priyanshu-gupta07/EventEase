import React, { useState, useEffect } from 'react';
import { getBookingsByUserId, getNextEvent } from '../api/Bookings/booking';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import defaultUserImage from '../assets/images/logo.webp';

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eventsOnCalendar, setEventsOnCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const user = localStorage.getItem('user');
  const userObject = JSON.parse(user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const bookingsResponse = await getBookingsByUserId(userObject.email);
        setBookings(bookingsResponse.data);

        const nextEventResponse = await getNextEvent(userObject.email);
        setNextEvent(nextEventResponse.data);

        // Filter and map only valid event dates
        const calendarEvents = bookingsResponse.data
          .filter(booking => booking.event_date)
          .map(booking => ({
            date: new Date(booking.event_date),
            eventName: booking.event_name,
            status: booking.booking_status,
          }));
        setEventsOnCalendar(calendarEvents);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userObject.email]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && eventsOnCalendar.some(event =>
      event.date.toDateString() === date.toDateString()
    )) {
      return 'bg-blue-500 text-white rounded-full border border-blue-700';
    }
    return null;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const renderEventPopup = () => {
    if (!selectedDate) return null;

    const eventsOnDate = eventsOnCalendar.filter(
      event => event.date.toDateString() === selectedDate.toDateString()
    );

    if (eventsOnDate.length === 0) return null;

    return (
      <div className="absolute top-full left-0 mt-2 bg-white p-4 rounded-lg shadow-lg z-10 border border-gray-300">
        <h3 className="font-bold mb-2 text-gray-800">Events on {selectedDate.toDateString()}</h3>
        <ul className="list-disc pl-5">
          {eventsOnDate.map((event, index) => (
            <li key={index} className="mb-1">
              <p className="font-semibold text-gray-800">{event.eventName}</p>
              <p className="text-sm text-gray-500">{event.status}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-4">
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-8 h-8 bg-red-500 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-900">
      {/* Profile Section */}
      <div className="flex items-center space-x-6 mb-10">
        <div className="w-28 h-28 rounded-full border-4 border-blue-500">
          <img src={defaultUserImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
        </div>
        <div>
          <h1 className="text-white text-3xl font-bold">{userObject.username}</h1>
          <p className="text-gray-400 text-lg">{userObject.role}</p>
          <p className="text-gray-400 text-lg">{userObject.email}</p>
        </div>
      </div>

      {/* Personalized Dashboard */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {/* Next Event */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Next Event</h2>
          {nextEvent ? (
            <div>
              <h3 className="text-xl font-semibold text-white">{nextEvent[0].event_name}</h3>
              <p className="text-gray-100">Date: {new Date(nextEvent[0].event_date).toDateString()}</p>
              <p className="text-gray-100">Status: {nextEvent[0].booking_status}</p>
              <Link to={`/event/${nextEvent.event_id}`} className="text-blue-300 hover:underline">View Details</Link>
            </div>
          ) : (
            <p className="text-gray-200">No upcoming events.</p>
          )}
        </div>

        {/* Event Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <h2 className="text-2xl font-bold mb-4">Your Events Calendar</h2>
          <div className="relative">
            <Calendar
              tileClassName={tileClassName}
              onClickDay={handleDateClick}
              className="rounded-lg shadow-md border border-gray-300"
            />
            {renderEventPopup()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
