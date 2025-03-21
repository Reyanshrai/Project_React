// src/components/dashboard/TodaysWorkout.jsx
import { Timer } from 'lucide-react';

const TodaysWorkout = ({ workoutName, duration }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
                <Timer className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-bold ml-2">Today's Workout</h2>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                <div>
                    <h4 className="font-semibold text-lg">{workoutName}</h4>
                    <p className="text-gray-600">Duration: {duration} minutes</p>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                    Start
                </button>
            </div>
        </div>
    );
};

export default TodaysWorkout;