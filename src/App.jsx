import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Component/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SchoolAdminDashboard from './dashboards/SchoolAdminDashboard';
import StudentDashboard from './dashboards/StudentDashboard';
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import ProtectedRoute from './security/ProtectedRoute';
import Navigate from './Component/Navigate';
import AssignSubjects from './pages/school-admin-pages/AssignSubjects';
import AllStudents from './pages/school-admin-pages/AllStudents';
import AddSubjects from './pages/school-admin-pages/AddSubjects';
import ManageSchools from './pages/super-admin-pages/ManageSchools';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute allowedRoles={['superadmin']} redirectPath="/" />}>
          <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
          <Route path="/manage-schools" element={<ManageSchools />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['schooladmin']} redirectPath="/" />}>
          <Route path="/school-admin-dashboard" element={<SchoolAdminDashboard />} />
          <Route path="/assign-subjects" element={<AssignSubjects />} />
          <Route path="/add-subjects" element={<AddSubjects />} />
          <Route path="/all-students" element={<AllStudents />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['student']} redirectPath="/" />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Route>

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
