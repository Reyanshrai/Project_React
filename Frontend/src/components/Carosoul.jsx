import React, { useState } from "react";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      src: "/images/slide1.jpg",
      heading: "Transform Your Body",
      subheading: "Join our expert-led fitness programs",
    },
    {
      id: 2,
      src: "/images/slide2.jpg",
      heading: "Achieve Your Goals",
      subheading: "Personalized workouts for every level",
    },
    {
      id: 3,
      src: "/images/slide3.jpg",
      heading: "Strength & Endurance",
      subheading: "Push your limits and become stronger",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative overflow-hidden rounded-lg h-[400px] md:h-[600px] mt-20">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full relative flex-shrink-0 h-full"
          >
            <img
              src={slide.src}
              alt={slide.heading}
              className="w-full h-full object-cover"
            />

            {/* Overlay Content (Aligned Left) */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center pl-10 md:pl-20 text-white">
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-5xl font-bold relative">
                  {slide.heading}
                  <span className="block w-24 md:w-32 h-1 bg-red-500 mt-2"></span>
                </h2>
                <p className="text-lg md:text-2xl mt-4 relative">
                  {slide.subheading}
                  <span className="block w-20 md:w-28 h-1 bg-red-500 mt-2"></span>
                </p>
              </div>
            </div>
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
      <div className="absolute bottom-4 left-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-red-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
