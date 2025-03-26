import { FaUsers, FaUserTie, FaHeart, FaDumbbell } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-100 p-4 sm:p-6 mt-14">
      <div className="max-w-7xl mx-auto">
        {/* About Us Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Left Section - Images */}
          <div className="relative h-auto">
            <img
              src="/images/aboutimg1.png"
              alt="Fitness 1"
              className="rounded-md w-full object-cover shadow-lg hover:scale-105 transition-all duration-700 max-h-[250px] sm:max-h-[350px] md:max-h-none"
            />
            <img
              src="/images/aboutimg2.png"
              alt="Fitness 2"
              className="rounded-md w-2/3 object-cover shadow-lg absolute bottom-0 right-0 transform translate-x-4 sm:translate-x-8 translate-y-4 sm:translate-y-8 hover:scale-105 transition-all duration-700"
            />
          </div>

          {/* Right Section - Content */}
          <div className="space-y-4 sm:space-y-6 mx-2 sm:mx-10 md:mx-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600">#2 About Us</h2>
            <p className="text-lg sm:text-xl text-gray-700">
              The fitness you will enjoy with our{" "}
              <span className="text-red-500">#Workout</span>
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              Porta finibus sapien suscipit in. Cras vestibulum neque sed ante
              rhoncus, sed feugiat felis porttitor. In auctor malesuada justo,
              sit amet congue justo eleifend nec.
            </p>

            {/* Checkmarks Section */}
            <ul className="space-y-2">
              {[
                "Aliquet non nulla fusce molestie posuere",
                "Sed semper blandit euismod fusce mauris",
                "Aenean sollicitudin magna vel efficitur",
              ].map((text, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-red-500 mr-2">✔</span> {text}
                </li>
              ))}
            </ul>

            {/* View More Button */}
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:scale-105 transition-all duration-700">
              VIEW MORE
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16 sm:mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center bg-white p-4 sm:p-6 rounded-md shadow">
          {[
            { icon: <FaUsers />, number: "1000+", text: "Happy Customers" },
            { icon: <FaUserTie />, number: "10+", text: "Personal Trainers" },
            { icon: <FaHeart />, number: "124+", text: "Communities" },
            { icon: <FaDumbbell />, number: "180+", text: "Equipment" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center hover:scale-105 transition-all duration-700 p-2 sm:p-4">
              <div className="text-red-500 text-2xl sm:text-4xl mb-2">{item.icon}</div>
              <p className="text-lg sm:text-2xl font-bold text-red-500">{item.number}</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
