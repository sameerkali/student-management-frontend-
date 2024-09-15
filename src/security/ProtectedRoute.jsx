// src/security/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, redirectPath }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    // If user role is not allowed, redirect to the specified path
    return <Navigate to={redirectPath} />;
  }

  // If authenticated and role is allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
