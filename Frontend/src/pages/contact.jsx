import React from "react";
// import { Navbar, Footer } from "../components";

const contact = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4 sm:py-16">
        <div className="container mx-auto max-w-6xl">
          {/* Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Latest News Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Latest News</h2>
              <div className="space-y-4">
                {[
                  {
                    date: "22 OCT",
                    title: "7 Precious tips to help you get better at GYM",
                    comments: 28,
                  },
                  {
                    date: "09 SEP",
                    title:
                      "You'll never thought that knowing GYM could be so beneficial",
                    comments: 12,
                  },
                  {
                    date: "18 AUG",
                    title:
                      "What's so trendy about GYM that everyone went crazy over it?",
                    comments: 78,
                  },
                ].map((news, index) => (
                  <div key={index} className="flex border-b pb-4">
                    <div className="text-center bg-red-500 text-white rounded-lg w-12 sm:w-16 h-12 sm:h-16 flex flex-col items-center justify-center mr-3 sm:mr-4 shrink-0">
                      <span className="text-sm sm:text-lg font-bold">
                        {news.date.split(" ")[0]}
                      </span>
                      <span className="text-xs sm:text-sm">{news.date.split(" ")[1]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2">{news.title}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        By Admin &middot; {news.comments} Comments
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Quick Contact</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="border p-2 rounded-md w-full text-sm sm:text-base"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="border p-2 rounded-md w-full text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Subject"
                    className="border p-2 rounded-md w-full text-sm sm:text-base"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Contact Number"
                    className="border p-2 rounded-md w-full text-sm sm:text-base"
                  />
                </div>
                <textarea
                  placeholder="Message"
                  className="border p-2 rounded-md w-full text-sm sm:text-base"
                  rows="4"
                  required
                ></textarea>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="Type the below word"
                    className="border p-2 rounded-md w-full text-sm sm:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 hover:scale-105 transition-all duration-700 w-full sm:w-auto"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default contact;
