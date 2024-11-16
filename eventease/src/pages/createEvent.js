import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Users, DollarSign, Tag, Mail, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EventForm = () => {
  const user = localStorage.getItem('user');
  const userObject = JSON.parse(user); // Correctly parse the string to an object

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    availableSeats: '',
    price: '',
    tags: '',
    organizerEmail: userObject.email,
    image: null,
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Success/Error message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(process.env.REACT_APP_EVENT_SERVICE_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response)
      setMessage('Event created successfully!'); // Set success message
      setLoading(false); // Set loading to false after request completion
      // Redirect to the home page after 2 seconds
      navigate('/event');
    } catch (error) {
      setMessage('Error creating event. Please try again.'); // Set error message
      setLoading(false);
       // Set loading to false if there's an error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-gradient-to-tr from-[#353535] to-[#181717] rounded-2xl shadow-xl max-w-4xl w-full p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create New Event</h2>
        {loading && <p className="text-white text-center">Creating event...</p>} {/* Show loading message */}
        {loading &&
            <div className="flex justify-center items-center mt-4">
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-8 h-8 bg-red-500 rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
        }
        {message && <p className="text-white text-center">{message}</p>} {/* Show success/error message */}
        {!loading && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Title and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Event Title"
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Location and Available Seats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Event Location"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-400 mb-2">Available Seats</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="number"
                    id="availableSeats"
                    name="availableSeats"
                    value={formData.availableSeats}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of Seats"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Price and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-2">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Event Price"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-400 mb-2">Tags</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tags (comma-separated)"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Organizer Email and Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="organizerEmail" className="block text-sm font-medium text-gray-400 mb-2">Organizer Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="email"
                    id="organizerEmail"
                    name="organizerEmail"
                    value={formData.organizerEmail}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={formData.organizerEmail}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-400 mb-2">Event Image</label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept="image/*"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 5: Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Event Description"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventForm;
