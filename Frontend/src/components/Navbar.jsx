import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Navbar = ({ scrollToSection, sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 500;
      Object.keys(sections).forEach((key) => {
        const section = sections[key]?.current;
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo and Title */}
        <a href="#home" className="flex items-center space-x-3">
          <img src="/images/logo.png" className="w-12 h-13" alt="Gym Logo" />
          <h2 className="text-[#F50B0B] text-2xl md:text-3xl font-semibold">
            GYM..
            <br />
            <span className="text-sm md:text-base dark:text-white absolute">
              FITNESS FOR ALL
            </span>
          </h2>
        </a>

        {/* Get Started Button and Mobile Menu Toggle */}
        <div className="flex md:order-2 space-x-3">
          <button
            onClick={handleGetStarted}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 hover:scale-105 transition-all duration-700"
          >
            Get Started
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navbar Links */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 mt-20 md:mt-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {[
              { name: "HOME", path: "home" },
              { name: "ABOUT", path: "about" },
              { name: "SERVICES", path: "services" },
              { name: "TIMETABLE", path: "timetable" },
              { name: "TRAINER", path: "trainer" },
              { name: "PRICING", path: "pricing" },
              { name: "CONTACT", path: "contact" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={`#${item.path}`}
                  onClick={() => scrollToSection(sections[item.path])}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                    activeSection === item.path
                      ? "text-blue-700 font-bold dark:text-blue-500"
                      : "text-gray-900 dark:text-white"
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
  );
};

export default Navbar;
