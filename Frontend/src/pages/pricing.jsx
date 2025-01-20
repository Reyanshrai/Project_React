import React from "react";

const Pricing = () => {
  return (
    <>
      <div>
        <div
          className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700 mt-20 py-10 ml-20 gap-10"
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
            <li className="flex items-center text-white text-xl">
              <span className="mr-2 text-white-500">•</span> Unlimited access to
              the GYM
            </li>
            <li className="flex items-center text-white text-xl">
              <span className="mr-2 text-white-500">•</span> FREE drinking
              package
            </li>
            <li className="flex items-center text-white text-xl">
              <span className="mr-2 text-white-500">•</span> One year membership
            </li>
            <li className="flex items-center text-white text-xl">
              <span className="mr-2 text-white-500">•</span> 3 classes per week
            </li>
            <li className="flex items-center text-white text-xl">
              <span className="mr-2 text-white-500">•</span> 1 Free personal
              training
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
    </>
  );
};

export default Pricing;
