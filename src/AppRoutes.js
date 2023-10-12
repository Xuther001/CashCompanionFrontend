import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import FinancePage from './FinancePage';
import NotFound from './NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/chat" element={<FinancePage />} />
        <Route path="*" element={<NotFound />} /> {/* 404 page */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;