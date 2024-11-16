import React, { useState, useEffect } from 'react';
import { getEventById } from '../api/event/event';
import axios from 'axios';
import { Calendar, MapPin, Users, DollarSign, Tag, Mail, Image } from 'lucide-react';
import { useParams,useNavigate } from 'react-router-dom';

const UpdateEventForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    availableSeats: '',
    price: '',
    tags: '',
    organizerEmail: '',
    image: null,
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Success/Error message
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const event = await getEventById(id);
        console.log('Fetched event data:', event.data);
        
        // Convert tags to array, handling various possible input formats
        let tagsArray = [];
        if (Array.isArray(event.data.Tags)) {
          tagsArray = event.data.Tags;
        } else if (typeof event.data.Tags === 'string') {
          tagsArray = event.data.Tags.split(',').map(tag => tag.trim());
        } else if (event.data.Tags) {
          console.warn('Unexpected tags format:', event.data.Tags);
          tagsArray = [String(event.data.Tags)];
        }

        setFormData({
          title: event.data.title || '',
          description: event.data.description || '',
          date: event.data.date ? event.data.date.split('T')[0] : '',
          location: event.data.location || '',
          availableSeats: event.data.AvailableSeats || '',
          price: event.data.price || '',
          tags: tagsArray,
          organizerEmail: event.data.organizer_email || '',
          image: event.data.image || null,
        });
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value.split(',').map(tag => tag.trim()),
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = new FormData();

    for (const key in formData) {
      if (key === 'tags') {
        data.append(key, JSON.stringify(formData.tags));
      } else if (key === 'image' && formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_EVENT_SERVICE_URL}/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Event updated:', response.data);
      setMessage('Event created successfully!'); // Set success message
      setLoading(false); // Set loading to false after request completion
      // Redirect to the home page after 2 seconds
      navigate('/event');
      // Handle success (e.g., show a success message, redirect)
    } catch (error) {
      console.error('Error updating event:', error);
      setLoading(false)
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-gradient-to-tr from-[#353535] to-[#181717] rounded-2xl shadow-xl max-w-4xl w-full p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Update Event</h2>
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
                        value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
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
                  placeholder="Organizer Email"
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
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event Description"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Update Event
          </button>
        </form>
         )}
      </div>
    </div>
  );
};

export default UpdateEventForm;
