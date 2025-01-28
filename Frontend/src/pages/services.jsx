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
      <div className="relative overflow-hidden mt-20">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {groupedSlides.map((group, index) => (
            <div key={index} className="flex min-w-full justify-center gap-4">
              {group.map((slide) => (
                <div
                  key={slide.id}
                  className="w-1/3 bg-gray-100 rounded-lg shadow-lg overflow-hidden relative hover:scale-105 transition-all duration-700"
                >
                  <img
                    src={slide.src}
                    alt={slide.heading}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-4 left-0 right-0 bg-red-500 ml-2 mr-2 p-2 rounded-lg hover:scale-105 transition-all duration-700">
                    <h3 className="text-2xl font-bold text-white">
                      {slide.heading}
                    </h3>
                    <p className="text-lg text-white">{slide.subheading}</p>
                    <button
                      onClick={() => openModal(slide.src)}
                      className="absolute top-4 right-2 bg-white text-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-700"
                    >
                      +
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
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        >
          ❮
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        >
          ❯
        </button>

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