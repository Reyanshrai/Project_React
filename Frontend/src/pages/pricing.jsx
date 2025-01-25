import React from "react";

const Pricing = () => {
  return (
    <div className="p-8 bg-gray-50 mt-20">
      <h1 className="text-center text-2xl font-bold text-red-600 mb-4">
        #06 Pricing
      </h1>
      <h2 className="text-center text-xl font-semibold mb-6">
        The foremost source and cheap{" "}
        <span className="text-red-500">#Pricing</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div
          className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700 py-10 mx-auto hover:scale-105 transition-all duration-700"
          style={{
            backgroundImage: "url('images/plan.png')", // Replace with your image URL
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h5 className="mb-4 text-3xl uppercase font-medium text-white text-center">
            Standard plan
          </h5>
          <div className="flex items-center justify-center text-white">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">29</span>
            <span className="ms-1 text-xl font-normal text-gray-300">
              /month
            </span>
          </div>
          <ul role="list" className="space-y-5 my-7">
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> Unlimited access to the GYM
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> FREE drinking package
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> One year membership
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> 3 classes per week
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> 1 Free personal training
            </li>
          </ul>
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-200 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
            Choose plan
          </button>
        </div>

        {/* Card 2 */}
        <div
          className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700 py-10 mx-auto hover:scale-105 transition-all duration-700"
          style={{
            backgroundImage: "url('images/plan.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h5 className="mb-4 text-3xl uppercase font-medium text-white text-center">
            Premium plan
          </h5>
          <div className="flex items-center justify-center text-white">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">49</span>
            <span className="ms-1 text-xl font-normal text-gray-300">
              /month
            </span>
          </div>
          <ul role="list" className="space-y-5 my-7">
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> Unlimited access to the GYM
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> FREE drinking package
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> One year membership
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> 5 classes per week
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> 2 Free personal training
            </li>
          </ul>
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-200 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
            Choose plan
          </button>
        </div>

        {/* Card 3 */}
        <div
          className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700 py-10 mx-auto hover:scale-105 transition-all duration-700"
          style={{
            backgroundImage: "url('images/plan.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h5 className="mb-4 text-3xl uppercase font-medium text-white text-center">
            Platinum plan
          </h5>
          <div className="flex items-center justify-center text-white">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">99</span>
            <span className="ms-1 text-xl font-normal text-gray-300">
              /month
            </span>
          </div>
          <ul role="list" className="space-y-5 my-7">
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> Unlimited access to the GYM
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> FREE drinking package
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> Two year membership
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> 7 classes per week
            </li>
            <li className="flex items-center justify-center text-white text-xl">
              <span className="mr-2">•</span> 5 Free personal training
            </li>
          </ul>
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-200 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
            Choose plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
