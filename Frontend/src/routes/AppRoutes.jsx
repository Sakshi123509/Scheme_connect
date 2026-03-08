// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';

// Pages
import Home from '../pages/Home';
import Login from '../pages/login';
import Signup from '../pages/Register';
import Scheme from '../pages/Scheme';
import SchemeDetail from '../pages/SchemeDetail';
import ApplyScheme from '../pages/ApplyScheme';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/contact';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/schemes" element={<Scheme />} />
        <Route path="/schemes/:id" element={<SchemeDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/apply/:id" element={<ProtectedRoute><ApplyScheme /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;