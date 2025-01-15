import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-gray-800 animate-bounce">
          404
        </h1>
        <p className="text-4xl font-semibold text-gray-600 mt-4 mb-8">
          Page Not Found
        </p>
        <p className="text-gray-500 mb-8 text-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200 transform hover:scale-105"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;