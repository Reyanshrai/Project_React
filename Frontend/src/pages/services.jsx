import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Clock, User, Dumbbell } from 'lucide-react';

const Services = () => {
  const slides = [
    {
      id: 1,
      src: "/images/slide1.jpg",
      heading: "Weight Loss",
      subheading: "Weight Loss Session",
      duration: "60 mins",
      trainer: "Expert Trainers",
      intensity: "Medium to High",
    },
    {
      id: 2,
      src: "/images/slide2.jpg",
      heading: "Yoga",
      subheading: "Yoga Session",
      duration: "45 mins",
      trainer: "Certified Instructors",
      intensity: "Low to Medium",
    },
    {
      id: 3,
      src: "/images/slide3.jpg",
      heading: "Energy Blast",
      subheading: "Energy Blast Session",
      duration: "30 mins",
      trainer: "Professional Coaches",
      intensity: "High",
    },
    {
      id: 4,
      src: "/images/service1.png",
      heading: "Cardio",
      subheading: "Cardio Session",
      duration: "45 mins",
      trainer: "Fitness Experts",
      intensity: "Medium to High",
    },
    {
      id: 5,
      src: "/images/service2.png",
      heading: "Strength",
      subheading: "Strength Training",
      duration: "60 mins",
      trainer: "Professional Trainers",
      intensity: "High",
    },
    {
      id: 6,
      src: "/images/aboutimg1.png",
      heading: "Pilates",
      subheading: "Pilates Session",
      duration: "45 mins",
      trainer: "Certified Instructors",
      intensity: "Low to Medium",
    },
  ];

  const groupedSlides = [];
  for (let i = 0; i < slides.length; i += 3) {
    groupedSlides.push(slides.slice(i, i + 3));
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? groupedSlides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === groupedSlides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Our Premium Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience world-class fitness programs with our
            <span className="text-red-500 font-semibold"> #Premium Services</span>
          </p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          {/* Slides */}
          <div
            className="flex transition-transform duration-700 ease-in-out h-[32rem]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {groupedSlides.map((group, index) => (
              <div key={index} className="flex min-w-full gap-6 px-4">
                {group.map((slide) => (
                  <div
                    key={slide.id}
                    className="w-1/3 bg-white rounded-2xl shadow-lg overflow-hidden group relative transform hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={slide.src}
                        alt={slide.heading}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {slide.heading}
                      </h3>
                      <p className="text-gray-600 mb-4">{slide.subheading}</p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{slide.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{slide.trainer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Dumbbell className="w-4 h-4" />
                          <span>{slide.intensity}</span>
                        </div>
                      </div>

                      <button className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white py-3 rounded-xl font-semibold transform hover:translate-y-[-2px] transition-all duration-300">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-3">
          {groupedSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-red-500 w-6" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;