// import React, { useState } from "react";

// const Carosoul = () => {
//   const slides = [
//     {
//       id: 1,
//       src: "/images/slide2.jpg",
//       heading: "GET YOUR BODY IN SHAPE",
//       subheading: "BEST FITNESS STUDIO",
//     },
//     {
//       id: 2,
//       src: "/images/slide1.jpg",
//       heading: "UNLEASH YOUR POTENTIAL",
//       subheading: "TRAIN WITH THE BEST",
//     },
//     {
//       id: 3,
//       src: "/images/slide3.jpg",
//       heading: "ACHIEVE YOUR GOALS",
//       subheading: "JOIN US TODAY",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? slides.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === slides.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <div className="relative overflow-hidden rounded-lg h-[400px] md:h-[670px]">
//       {/* Slide */}
//       <div
//         className="flex transition-transform duration-700"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {slides.map((slide) => (
//           <div
//             key={slide.id}
//             className="min-w-full relative flex-shrink-0 h-full"
//           >
//             <img
//               src={slide.src}
//               alt={slide.heading}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-left ml-100 text-white">
//               <h2 className="text-4xl uppercase">{slide.heading}</h2>
//               <h1 className="text-xl font-bold">{slide.subheading}</h1>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Buttons */}
//       <button
//         onClick={goToPrevious}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
//       >
//         ❮
//       </button>
//       <button
//         onClick={goToNext}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
//       >
//         ❯
//       </button>

//       {/* Dots Indicator */}
//       <div className="flex justify-center space-x-2 mt-4">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 rounded-full  absolute flex flex-col justify-center items-center ${
//               index === currentIndex ? "bg-red-500" : "bg-gray-300"
//             }`}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carosoul;
import React, { useState } from "react";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      src: "/images/slide1.jpg",
      heading: "GET YOUR BODY IN SHAPE",
      subheading: "BEST FITNESS STUDIO",
    },
    {
      id: 2,
      src: "/images/slide2.jpg",
      heading: "UNLEASH YOUR POTENTIAL",
      subheading: "TRAIN WITH THE BEST",
    },
    {
      id: 3,
      src: "/images/slide3.jpg",
      heading: "ACHIEVE YOUR GOALS",
      subheading: "JOIN US TODAY",
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
    <div className="relative overflow-hidden rounded-lg h-[400px] md:h-[600px]">
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
            <div className="absolute bottom-8 left-8">
              <h2 className="text-sm uppercase text-white">
                {slide.heading}
              </h2>
              <h1 className="text-2xl font-bold text-white border-b-4 border-red-500 inline-block mt-2">
                {slide.subheading}
              </h1>
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
