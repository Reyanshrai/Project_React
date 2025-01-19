import React from "react";
// import { Navbar, Footer } from "../components";

const trainerData = [
  {
    image: "/images/service1.png", // Replace with actual image URL
    title: "Himanshu Kumar",
    caption: "Expert Fitness Trainer",
  },
  {
    image: "/images/service2.png", // Replace with actual image URL
    title: "Raghuveer Kumar",
    caption: "Certified Yoga Instructor",
  },
  {
    image: "/images/service1.png", // Replace with actual image URL
    title: "Vivek Sah",
    caption: "Professional Strength Coach",
  },
];

const trainer = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-gray-100 p-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Header Section */}
          <h2 className="text-3xl font-bold text-gray-800">#05 Trainers</h2>
          <p className="text-xl text-gray-700 mt-2">
            We take pride in our superior{" "}
            <span className="text-red-500">#Trainers</span>
          </p>

          {/* Trainers Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainerData.map((trainer, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Trainer Image */}
                <img
                  src={trainer.image}
                  alt={trainer.title}
                  className="w-full h-48 object-cover"
                />

                {/* Trainer Details */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    {trainer.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{trainer.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <Footer/> */}
    </>
  );
};

export default trainer;
