import React, { useState } from "react";

const Services = () => {
  const slides = [
    { id: 1, src: "/images/slide1.jpg", heading: "Weight", subheading: "Weight Loss Session" },
    { id: 2, src: "/images/slide2.jpg", heading: "Yoga", subheading: "Yoga Session" },
    { id: 3, src: "/images/slide3.jpg", heading: "Energy", subheading: "Energy Blast Session" },
    { id: 4, src: "/images/service1.png", heading: "Cardio", subheading: "Cardio Session" },
    { id: 5, src: "/images/service2.png", heading: "Strength", subheading: "Strength Training" },
    { id: 6, src: "/images/aboutimg1.png", heading: "Pilates", subheading: "Pilates Session" },
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

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="bg-white py-10 mt-16 p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-600">#03 — Services</h2>
        <p className="text-xl font-medium text-gray-700 mt-2">
          We're giving guarantee for exquisite{" "}
          <span className="text-red-500">#Services</span>
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
        <div className="flex justify-center mt-6 space-x-2 hover:scale-105 transition-all duration-700">
          {groupedSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-red-500" : "bg-gray-500"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={modalImage}
              alt="Zoomed Slide"
              className="w-full max-w-3xl h-auto rounded-lg shadow-lg transition-transform transform scale-105"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white text-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
