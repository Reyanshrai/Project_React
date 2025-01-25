import React, { useState } from "react";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      src: "/images/slide1.jpg",
    },
    {
      id: 2,
      src: "/images/slide2.jpg",
    },
    {
      id: 3,
      src: "/images/slide3.jpg",
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
              className="w-full h-full object-cover "
            />
            
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
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
