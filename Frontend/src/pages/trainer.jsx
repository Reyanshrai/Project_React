import React from "react";
import { Star, Linkedin, Instagram, Facebook } from "lucide-react";

const trainerData = [
  {
    image: "/images/service1.png",
    title: "Himanshu Kumar",
    caption: "Expert Fitness Trainer",
    specialties: ["Weight Training", "HIIT", "Nutrition"],
    experience: "8+ years",
    rating: 4.9,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/himanshu",
      instagram: "https://www.instagram.com/himanshu",
      facebook: "https://www.facebook.com/himanshu",
    },
    description: "Himanshu is a passionate fitness trainer with extensive experience in weight training, HIIT, and nutrition. He helps individuals achieve their fitness goals with customized workout plans.",
  },
  {
    image: "/images/service2.png",
    title: "Raghuveer Kumar",
    caption: "Certified Yoga Instructor",
    specialties: ["Hatha Yoga", "Meditation", "Breathing"],
    experience: "10+ years",
    rating: 4.8,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/raghuveer",
      instagram: "https://www.instagram.com/raghuveer",
      facebook: "https://www.facebook.com/raghuveer",
    },
    description: "Raghuveer is a certified yoga instructor who specializes in Hatha Yoga and meditation. His goal is to help people find balance and peace through mindful practices.",
  },
  {
    image: "/images/service1.png",
    title: "Vivek Sah",
    caption: "Professional Strength Coach",
    specialties: ["Powerlifting", "CrossFit", "Mobility"],
    experience: "6+ years",
    rating: 4.7,
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/vivek",
      instagram: "https://www.instagram.com/vivek",
      facebook: "https://www.facebook.com/vivek",
    },
    description: "Vivek is a professional strength coach who focuses on powerlifting and CrossFit. He helps athletes and fitness enthusiasts build strength and mobility to improve performance.",
  },
];

const Trainer = () => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex justify-center items-center mt-2">
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} className="text-yellow-400 w-5 h-5" fill="currentColor" />
        ))}
        {halfStar && <Star className="text-yellow-400 w-5 h-5" />}
        {[...Array(emptyStars)].map((_, index) => (
          <Star key={index} className="text-gray-300 w-5 h-5" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-6 mt-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-red-600">#05 Trainers</h2>
        <p className="text-xl text-gray-700 mt-2">
          We take pride in our superior{" "}
          <span className="text-red-500">#Trainers</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {trainerData.map((trainer, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative overflow-hidden group">
              <img
                src={trainer.image}
                alt={trainer.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                <p className="text-sm font-semibold text-gray-700">
                  {trainer.experience}
                </p>
              </div>
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-gray-800">{trainer.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{trainer.caption}</p>
              <p className="text-gray-600 text-sm mt-4">{trainer.description}</p>

              {/* Star Rating */}
              {renderStars(trainer.rating)}

              {/* Social Media Links */}
              <div className="mt-4 flex justify-center gap-4">
                <a
                  href={trainer.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all"
                >
                  <Linkedin className="text-white w-5 h-5" />
                </a>
                <a
                  href={trainer.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all"
                >
                  <Instagram className="text-white w-5 h-5" />
                </a>
                <a
                  href={trainer.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-all"
                >
                  <Facebook className="text-white w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Trainer;
