import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

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

  const slidesPerGroup = 3;
  const groupedSlides = [];
  for (let i = 0; i < slides.length; i += slidesPerGroup) {
    groupedSlides.push(slides.slice(i, i + slidesPerGroup));
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalContent, setModalContent] = useState(null);

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

  const openModal = (slide) => {
    setModalContent(slide);
  };

  const closeModal = () => {
    setModalContent(null);
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
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {groupedSlides.map((group, index) => (
              <div key={index} className="flex w-full flex-shrink-0 justify-center gap-4">
                {group.map((slide) => (
                  <div key={slide.id} className="w-1/3 bg-gray-100 rounded-lg shadow-lg overflow-hidden relative hover:scale-105 transition-all duration-700">
                    <img src={slide.src} alt={slide.heading} className="w-full h-64 object-cover" />
                    <div className="absolute bottom-4 left-0 right-0 bg-red-500 ml-2 mr-2 p-2 rounded-lg hover:scale-105 transition-all duration-700">
                      <h3 className="text-2xl font-bold text-white">{slide.heading}</h3>
                      <p className="text-lg text-white">{slide.subheading}</p>
                      <button
                        onClick={() => openModal(slide)}
                        className="absolute top-4 right-2 bg-white text-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-700"
                      >
                        <Plus size={16} />
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
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {groupedSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-red-500 w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal */}
        {modalContent && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full p-4 relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600"
              >
                <X size={24} />
              </button>
              <img src={modalContent.src} alt={modalContent.heading} className="w-full h-64 object-cover rounded-lg" />
              <div className="p-4">
                <h3 className="text-2xl font-bold text-gray-900">{modalContent.heading}</h3>
                <p className="text-lg text-gray-700">{modalContent.subheading}</p>
                <div className="mt-4">
                  <p className="text-gray-800">
                    <strong>Duration:</strong> {modalContent.duration}
                  </p>
                  <p className="text-gray-800">
                    <strong>Trainer:</strong> {modalContent.trainer}
                  </p>
                  <p className="text-gray-800">
                    <strong>Intensity:</strong> {modalContent.intensity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
