// src/components/dashboard/StatsGrid.jsx
import { Activity, TrendingUp, Heart } from 'lucide-react';

const StatsGrid = ({ steps, calories, heartRate }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard 
                title="Daily Steps"
                value={steps.toLocaleString()}
                icon={<Activity className="h-8 w-8 text-white" />}
                color="blue"
            />
            <StatCard 
                title="Calories Burned"
                value={`${calories} kcal`}
                icon={<TrendingUp className="h-8 w-8 text-white" />}
                color="green"
            />
            <StatCard 
                title="Heart Rate"
                value={`${heartRate} BPM`}
                icon={<Heart className="h-8 w-8 text-white" />}
                color="red"
            />
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => {
    const colors = {
        blue: {
            bg: "from-blue-500 to-blue-600",
            text: "text-blue-600"
        },
        green: {
            bg: "from-green-500 to-green-600",
            text: "text-green-600"
        },
        red: {
            bg: "from-red-500 to-red-600",
            text: "text-red-600"
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
                <div className={`bg-gradient-to-br ${colors[color].bg} p-3 rounded-lg shadow-lg`}>
                    {icon}
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <h3 className={`text-2xl font-bold ${colors[color].text}`}>{value}</h3>
                </div>
            </div>
        </div>
    );
};

export default StatsGrid;