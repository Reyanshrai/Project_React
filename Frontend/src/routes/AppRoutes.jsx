import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navbar, Footer } from "../components";
import {
  Home,
  About,
  Services,
  Timetable,
  Trainer,
  Pricing,
  Contact,
  Login,
  Register,
  ForgotPassword,
  Dashboard,
  NotFound,
} from "../pages";

import ProtectedRoute from "./ProtectedRoute";
import {
  AdminDashboard,
  AdminLogin,
  Payments,
  GymMembers,
  TrainersManagement,
} from "../pages/Admin";

const AppRoutes = () => {
  const { user } = useContext(UserContext);
  const isLoggedIn = !!user;
  const location = useLocation();

  const hideNavbarRoutes = ["/dashboard", "/admin-dashboard"];
  const hideFooterRoutes = ["/dashboard", "/admin-dashboard"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/admin/login"
          element={
            isLoggedIn ? <Navigate to="/admin-dashboard" /> : <AdminLogin />
          }
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default AppRoutes;
