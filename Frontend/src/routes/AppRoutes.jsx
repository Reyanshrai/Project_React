import { Routes, Route } from "react-router-dom";
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
  NotFound
} from "../pages";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="/timetable" element={<Timetable />}></Route>
        <Route path="/trainer" element={<Trainer />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
<<<<<<< HEAD
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
=======
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="*" element={<NotFound />}></Route>
>>>>>>> 850f463f69dc5a806773e5d1918391fba87bf13e
    </Routes>
);

export default AppRoutes;
