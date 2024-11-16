import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById,updateEventseats } from '../api/event/event';
import io from 'socket.io-client';
import { createbooking,getBookings } from '../api/Bookings/booking';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const socket = io(process.env.REACT_APP_EVENT_SERVICE_URL);

const GeometricEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmModal2, setShowConfirmModal2] = useState(false);
  const [seats, setSeats] = useState(1);
  const [tickets, setTickets] = useState([]);

  const user=localStorage.getItem('user');
  const Userobject = JSON.parse(user);

  const navigate= useNavigate();

  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    if(user)
    {
      getBookings(Userobject.email,id)
      .then(response => {
        setTickets(response.data);
        setTimeout(() => {
          setLoading(false);;
         },1000) 
      })
      .catch(error => {
        console.error('Error fetching event:', error);
       setTimeout(() => {
        setLoading(false);
       }, 1000);
      });
    }
  }, [id,tickets]);

  const items = tickets.map((ticket, index) => (
    <div
      key={ticket._id}
      className="bg-white p-6 rounded-lg shadow-md text-center min-h-[200px] border border-gray-300"
      onDragStart={handleDragStart}
      role="presentation"
    >
      <p className="text-lg font-bold text-gray-800">Ticket #{index + 1}</p>
      <p className="text-sm mt-2 text-gray-600">Event: {ticket.event_name}</p> {/* Event Name */}
      <p className="text-sm text-gray-600">Username: {ticket.username}</p> {/* Username */}
      <p className="text-sm text-gray-600">Booking Date: {new Date(ticket.booking_date).toLocaleDateString()}</p> {/* Format date */}
      <p className="text-sm text-gray-600">Event Date: {new Date(ticket.event_date).toLocaleDateString()}</p> {/* Event Date */}
      <p className="text-sm text-gray-600">Amount Paid: ${ticket.Amount_paid}</p> {/* Amount Paid */}
      <p className="text-sm text-gray-600">Booking Status: {ticket.booking_status}</p> {/* Booking status */}
      <p className="text-sm text-gray-600">Seats: {ticket.seat_no.join(', ')}</p> {/* Render seat numbers array */}
      <p className="text-sm text-gray-600">Total Seats: {ticket.count}</p> {/* Total Seats */}
    </div>
  ));
  
  
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

  useEffect(() => {
    socket.on('seatsUpdated', (data) => {
        if (data.id === event.id) {
            setEvent((prevEvent) => ({
                ...prevEvent,
                bookedSeats: data.totalBookedSeats 
            }));
        }
    });

    return () => {
        socket.off('seatsUpdated');
    };
}, [event]);

  const Bookseats = async () => {
    closeConfirmModal();
    setLoading(true); 

    try {
        // Await the completion of updateEventSeats
      const response=  await updateEventseats(id, seats);
      console.log(response);
      if(response.message==="Success")
      {
        console.log("here");
        const bookingData = {
            event_id:id,
            booking_date:Date.now(),
            booking_status: "Booked",
            user_id: Userobject.email,
            event_name:event.title,
            username:Userobject.username,
            event_date:event.date,
            Amount_paid:event.price*seats,
            seat_no:response.data,
            count:seats
        }
        const bookingResponse = await createbooking(bookingData);
        console.log(bookingResponse);
    }
    } catch (error) {
        console.error('Error booking seats:', error);
    } finally {
        // Ensure loading is set to false once the operation is complete
        setLoading(false);
    }
  };

  const openConfirmModal = () => {
    if(!user){
      alert("Please login to book the event");
      navigate('/login');
    }
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const openConfirmModal2 = () => {
    if(!user){
      alert("Please login to book the event");
      navigate('/login');
    }
    setShowConfirmModal2(true);
  };

  const closeConfirmModal2 = () => {
    setShowConfirmModal2(false);
  };

  

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
              <button className="text-blue-200 font-semibold py-2 px-4 md:py-3 md:px-8 rounded-full transition-colors"
                onClick={openConfirmModal}>
                  Book Now
              </button>
            </div>

            <div className="transition-transform transform flex justify-center items-center w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto shadow-2xl hover:scale-110">
              <button className="text-blue-200 font-semibold py-2 px-4 md:py-3 md:px-8 rounded-full transition-colors"
                onClick={openConfirmModal2}>
                  Get tickets
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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-[#353535] to-[#181717] text-white p-8 rounded-lg shadow-lg space-y-4">
            <h2 className="text-lg font-semibold">choose the no seats</h2>
            <input type='number' 
            className="w-full p-2 rounded-md text-black" 
            placeholder={seats} min={1} 
            onChange={(e) => {setSeats(e.target.value);}}
            value={seats}/>
            <div className="flex justify-end space-x-4">
              <button onClick={closeConfirmModal} className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
              <button onClick={Bookseats} className="bg-white text-black px-4 py-2 rounded-md hover:bg-blue-400">Book now</button>
            </div>
          </div>
        </div>
      )}

    {showConfirmModal2 && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-gradient-to-r from-[#353535] to-[#181717] text-white p-8 rounded-lg shadow-lg w-1/3 max-w-80">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={closeConfirmModal2}
          >
            &times;
          </button>

          <h2 className="text-3xl font-semibold text-center mb-6">Your Tickets</h2>

          {/* AliceCarousel for ticket slider */}
          <AliceCarousel
            mouseTracking
            items={items}
            responsive={{
              0: { items: 1 },
              568: { items: 1 },
              1024: { items: 1 },
            }}
            controlsStrategy="responsive"
            disableDotsControls={false}  // You can hide dots if you don't want them
            disableButtonsControls={false}  // You can hide next/prev buttons if you don't want them
            autoPlay={false}  // You can set this to true if you want auto play
            infinite={false}  // Set to true if you want infinite scrolling
          />
        </div>
      </div>
    )}

    </div>
  );
};

export default GeometricEvent;