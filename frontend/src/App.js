import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import CreateBooking from "./pages/CreateBooking";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./pages/AdminServices"; // New component for service management
import NotFound from "./pages/NotFound"; // New 404 page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Customer routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="USER">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-booking"
          element={
            <ProtectedRoute requiredRole="USER">
              <CreateBooking />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminServices />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
