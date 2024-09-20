import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Search, Users } from 'lucide-react';
import logo from "../assets/images/logo.webp"

const IntroPage = ({ onComplete }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    onComplete(); // Call the onComplete function passed from App component
    navigate('/event');
  };

  const features = [
    {
      icon: <Calendar className="w-12 h-12 text-blue-500" />,
      title: 'Book Events',
      description: 'Discover and book exciting events that match your interests.',
    },
    {
      icon: <Search className="w-12 h-12 text-green-500" />,
      title: 'Easy Search',
      description: 'Find events by location, date, or category with our powerful search.',
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: 'Organize Events',
      description: 'Create and manage your own events as an organizer.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-black text-black p-6">
      <div className="max-w-6xl w-full text-center">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-down">Welcome to EventEase</h1>
            <p className="text-xl mb-8 animate-fade-in-up">Your one-stop platform for discovering, booking, and organizing events.</p>
            <button
              onClick={handleGetStarted}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 animate-bounce"
            >
              Get Started <ArrowRight className="inline-block ml-2" />
            </button>
          </div>
          <div className="md:w-1/2 animate-fade-in flex justify-center">
            <img
              src={logo}
              alt="EventEase"
              className="rounded-lg shadow-2xl max-w-full h-auto w-3/4"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-white">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#232324] rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 animate-fade-in">
              <div className="mb-4">{feature.icon}</div>
              <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroPage;