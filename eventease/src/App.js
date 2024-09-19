import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLoayout';
import Login from './pages/loginpage';
import User from './pages/user';
import Event from './pages/Event';
import EventForm from './pages/createEvent';
import Organiser from './pages/organiser';
import SingleEvent from './pages/singleEvent';
import OrganiserEvent from './pages/eventorganiser';
import UpdateEventForm from './pages/updateEvent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/user" element={<User />} />
          <Route path="/organiser" element={<Organiser />} />
          <Route path="/event" element={<Event />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event/create" element={<EventForm />} />
          <Route path="/event/:id" element={<SingleEvent />} />
          <Route path="/event/organiser/:id" element={<OrganiserEvent />} />
          <Route path="/event/organiser/update/:id" element= {<UpdateEventForm/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;