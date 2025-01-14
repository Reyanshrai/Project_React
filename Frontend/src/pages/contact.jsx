import React from "react";
import { Navbar, Footer } from "../components";

const contact = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="container mx-auto p-4">
          {/* Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Latest News Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Latest News</h2>
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
                    <div className="text-center bg-red-500 text-white rounded-lg w-16 h-16 flex flex-col items-center justify-center mr-4">
                      <span className="text-lg font-bold">
                        {news.date.split(" ")[0]}
                      </span>
                      <span className="text-sm">{news.date.split(" ")[1]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{news.title}</h3>
                      <p className="text-gray-500 text-sm">
                        By Admin &middot; {news.comments} Comments
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Contact</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="border p-2 rounded-md w-full"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Subject"
                    className="border p-2 rounded-md w-full"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Contact Number"
                    className="border p-2 rounded-md w-full"
                  />
                </div>
                <textarea
                  placeholder="Message"
                  className="border p-2 rounded-md w-full"
                  rows="4"
                  required
                ></textarea>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Type the below word"
                    className="border p-2 rounded-md w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default contact;
