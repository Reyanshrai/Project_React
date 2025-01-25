import { Navbar } from "../components";
import { FaUsers, FaUserTie, FaHeart, FaDumbbell } from "react-icons/fa";

const About = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-gray-100 p-6  mt-14">
        <div className="max-w-7xl mx-auto">
          {/* About Us Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Section - Images */}
            <div className="relative">
              <img
                src="/images/aboutimg1.png"
                alt="Fitness 1"
                className="rounded-md w-full h-auto object-cover shadow-lg  hover:scale-105 transition-all duration-700"
              />
              <img
                src="/images/aboutimg2.png"
                alt="Fitness 2"
                className="rounded-md w-2/3 h-200px object-cover shadow-lg absolute bottom-0 right-0  transform translate-x-14 translate-y-14  hover:scale-105 transition-all duration-700"
              />
            </div>

            {/* Right Section - Content */}
            <div className="space-y-6 mx-20">
              <h2 className="text-3xl font-bold text-red-600">#2 About Us</h2>
              <p className="text-xl text-gray-700">
                The fitness you will enjoy with our{" "}
                <span className="text-red-500">#Workout</span>
              </p>
              <p className="text-gray-600">
                Porta finibus sapien suscipit in. Cras vestibulum neque sed ante
                rhoncus, sed feugiat felis porttitor. In auctor malesuada justo,
                sit amet congue justo eleifend nec. Nunc quis hendrerit ante.
                Donec blandit tincidunt lacus.
              </p>

              {/* Checkmarks Section */}
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">✔</span> Aliquet non nulla
                  fusce molestie posuere
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">✔</span> Sed semper
                  blandit euismod fusce mauris
                </li>
                <li className="flex items-center ">
                  <span className="text-red-500 mr-2 ">✔</span> Aenean
                  sollicitudin magna vel efficitur
                </li>
              </ul>

              {/* View More Button */}
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600  hover:scale-105 transition-all duration-700">
                VIEW MORE
              </button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 text-center bg-white p-6 rounded-md shadow ">
            <div className="flex flex-col items-center  hover:scale-105 transition-all duration-700">
              <FaUsers className="text-red-500 text-4xl mb-2" />
              <p className="text-2xl font-bold text-red-500">1000+</p>
              <p className="text-gray-700">Happy Customers</p>
            </div>
            <div className="flex flex-col items-center  hover:scale-105 transition-all duration-700">
              <FaUserTie className="text-red-500 text-4xl mb-2" />
              <p className="text-2xl font-bold text-red-500">10+</p>
              <p className="text-gray-700">Personal Trainer</p>
            </div>
            <div className="flex flex-col items-center  hover:scale-105 transition-all duration-700">
              <FaHeart className="text-red-500 text-4xl mb-2" />
              <p className="text-2xl font-bold text-red-500">124+</p>
              <p className="text-gray-700">Communities</p>
            </div>
            <div className="flex flex-col items-center  hover:scale-105 transition-all duration-700">
              <FaDumbbell className="text-red-500 text-4xl mb-2" />{" "}
              <p className="text-2xl font-bold text-red-500">180+</p>
              <p className="text-gray-700">Equipment</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
