// src/components/dashboard/WeeklyProgress.jsx
import { Target } from 'lucide-react';

const WeeklyProgress = ({ progress }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
                <Target className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-bold ml-2">Weekly Progress</h2>
            </div>
            <div className="space-y-4">
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${(progress / 7) * 100}%` }}
                    ></div>
                </div>
                <p className="text-gray-600 font-medium">{progress}/7 workout days completed</p>
            </div>
        </div>
    );
};

export default WeeklyProgress;