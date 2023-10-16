import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../Webpages/LoginPage';
import FinancePage from '../Webpages/FinancePage';
import RegisterPage from '../Webpages/RegistrationPage';
import NotFound from '../NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<FinancePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} /> {/* 404 page */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;