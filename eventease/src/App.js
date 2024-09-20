import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';
import Login from './pages/loginpage';
import User from './pages/user';
import Event from './pages/Event';
import EventForm from './pages/createEvent';
import Organiser from './pages/organiser';
import SingleEvent from './pages/singleEvent';
import OrganiserEvent from './pages/eventorganiser';
import UpdateEventForm from './pages/updateEvent';
import IntroPage from './pages/Intropage';

function App() {
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    return localStorage.getItem('userHasSeenIntro') === 'true';
  });

  const handleIntroCompletion = () => {
    localStorage.setItem('userHasSeenIntro', 'true');
    setHasSeenIntro(true);
  };

  return (
    <Router>
      <Routes>
        {!hasSeenIntro ? (
          <Route 
            path="/" 
            element={<IntroPage onComplete={handleIntroCompletion} />} 
          />
        ) : (
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Event />} />
            <Route path="/user" element={<User />} />
            <Route path="/organiser" element={<Organiser />} />
            <Route path="/event" element={<Event />} />
            <Route path="/login" element={<Login />} />
            <Route path="/event/create" element={<EventForm />} />
            <Route path="/event/:id" element={<SingleEvent />} />
            <Route path="/event/organiser/:id" element={<OrganiserEvent />} />
            <Route path="/event/organiser/update/:id" element={<UpdateEventForm />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;