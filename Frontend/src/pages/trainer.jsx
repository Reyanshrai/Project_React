import React from "react";
import { Star, Award, Linkedin, Instagram, Twitter } from 'lucide-react';

const trainerData = [
  {
    image: "/images/service1.png",
    title: "Himanshu Kumar",
    caption: "Expert Fitness Trainer",
    specialties: ["Weight Training", "HIIT", "Nutrition"],
    experience: "8+ years",
    rating: 4.9,
  },
  {
    image: "/images/service2.png",
    title: "Raghuveer Kumar",
    caption: "Certified Yoga Instructor",
    specialties: ["Hatha Yoga", "Meditation", "Breathing"],
    experience: "10+ years",
    rating: 4.8,
  },
  {
    image: "/images/service1.png",
    title: "Vivek Sah",
    caption: "Professional Strength Coach",
    specialties: ["Powerlifting", "CrossFit", "Mobility"],
    experience: "6+ years",
    rating: 4.7,
  },
];

const Trainer = () => {
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
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainerData.map((trainer, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Trainer Image Container */}
              <div className="relative overflow-hidden group">
                <img
                  src={trainer.image}
                  alt={trainer.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Experience Badge */}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                  <p className="text-sm font-semibold text-gray-700">{trainer.experience}</p>
                </div>
              </div>

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

export default Trainer;