import { Routes, Route,Navigate,useLocation } from "react-router-dom";
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
  // NotFound,
} from "../pages";
import ProtectedRoute from "../utils/ProtectedRoute";

const AppRoutes = () => {
  
  const isLoggedIn = localStorage.getItem("token") !== null;
  const location = useLocation();

  const hideNavbarRoutes = ['/dashboard']

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  
  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {/* Define your routes here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isLoggedIn}><Dashboard/></ProtectedRoute>}/>
        <Route path="*" element={<Navigate to = "/login"/>} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
