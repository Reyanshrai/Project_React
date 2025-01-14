import React, { useState } from "react";
import {Navbar,Footer} from '../components'
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forgot Password Form Submitted", email);
    // Handle forgot password logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="flex-grow flex items-center justify-center bg-cover bg-center bg-gray-100 dark:bg-gray-900 pt-20" style={{
          backgroundImage: "url('./images/image 7.png')",
        }}
      >
        <div
          className="shadow-lg rounded-lg p-8 max-w-lg w-full"
          style={{
            background: "transparent",
            // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            // backdropFilter: "blur(10px)",
          }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remembered your password?{" "}
                <Link 
                  to="/Login"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Go To Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
