import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGetStarted = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAdminLogin = () => {
    navigate("/Admin-Login");
    closeModal();
  };

  const handleUserLogin = () => {
    navigate("/login");
    closeModal();
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 top-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo and Title */}
          <a href="home" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/images/logo.png" className="w-12 h-13" alt="Flowbite Logo" />
            <h2 className="text-[#F50B0B] text-2xl md:text-3xl font-semibold">
              GYM..
              <br />
              <span className="text-sm md:text-base dark:text-[#ffffff] absolute ">
                FITNESS FOR ALL
              </span>
            </h2>
          </a>

          {/* Get Started Button and Mobile Menu Toggle */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={handleGetStarted}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 hover:scale-105 transition-all duration-700"
            >
              Get Started
            </button>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          {/* Navbar Links */}
          <div className={`${isMenuOpen ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
            <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 mt-4 md:mt-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {[
                { name: "HOME", path: "/" },
                { name: "ABOUT", path: "/about" },
                { name: "SERVICES", path: "/services" },
                { name: "TIMETABLE", path: "/timetable" },
                { name: "TRAINER", path: "/trainer" },
                { name: "PRICING", path: "/pricing" },
                { name: "CONTACT", path: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                      activeLink === item.path ? "text-blue-700 font-bold dark:text-blue-500" : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal for Login Options */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Choose Login</h2>
            <div className="flex flex-col space-y-4">
              <button onClick={handleAdminLogin} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Admin Login
              </button>
              <button onClick={handleUserLogin} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                User Login
              </button>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
