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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Meet Our Expert Trainers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your fitness journey with our certified and experienced
            <span className="text-red-500 font-semibold"> #Trainers</span>
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
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{trainer.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{trainer.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-500" />
                  {trainer.caption}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 pt-4 border-t">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-pink-600 hover:bg-pink-50 rounded-full transition-colors">
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-blue-400 hover:bg-blue-50 rounded-full transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainer;