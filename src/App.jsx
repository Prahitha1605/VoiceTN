import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ComplaintProvider } from './context/ComplaintContext';
import Landing from './pages/Landing';
import CitizenWelcome from './pages/CitizenWelcome';
import Chatbot from './pages/Chatbot';
import ComplaintForm from './pages/ComplaintForm';
import Success from './pages/Success';
import AuthorityDashboard from './pages/AuthorityDashboard';

function App() {
  return (
    <Router>
      <ComplaintProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/citizen-welcome" element={<CitizenWelcome />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/complaint-form" element={<ComplaintForm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/authority" element={<AuthorityDashboard />} />
        </Routes>
      </ComplaintProvider>
    </Router>
  );
}

export default App;
