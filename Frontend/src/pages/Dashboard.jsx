import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/userContext";
import { 
  Activity, 
  Calendar, 
  Heart, 
  TrendingUp, 
  Weight, 
  Timer, 
  Target,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        navigate("/login");
        return null;
    }

    const userData = {
        name: user.firstname,
        dailySteps: 8432,
        calories: 1250,
        weight: 75.5,
        heartRate: 72,
        workoutMinutes: 45,
        weeklyGoalProgress: 4,
        nextWorkout: "Upper Body Strength",
        upcomingClasses: [
            { name: "Yoga Flow", time: "Tomorrow, 9:00 AM" },
            { name: "HIIT Training", time: "Thursday, 5:30 PM" },
            { name: "Core Workout", time: "Friday, 4:00 PM" }
        ]
    };

    const handleLogout = () => {
        logout();
        alert("Logged out successfully");
        navigate("/home");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 flex flex-wrap items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                            Welcome back, {userData.name}
                        </h1>
                        <p className="text-gray-600">Track your fitness journey and achieve your goals</p>
                    </div>
                    <button 
                        className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-400 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300" 
                        onClick={handleLogout}
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Steps Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg">
                                <Activity className="h-8 w-8 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Daily Steps</p>
                                <h3 className="text-2xl font-bold text-blue-600">{userData.dailySteps.toLocaleString()}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Calories Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg shadow-lg">
                                <TrendingUp className="h-8 w-8 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Calories Burned</p>
                                <h3 className="text-2xl font-bold text-green-600">{userData.calories} kcal</h3>
                            </div>
                        </div>
                    </div>

                    {/* Heart Rate Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-lg shadow-lg">
                                <Heart className="h-8 w-8 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Heart Rate</p>
                                <h3 className="text-2xl font-bold text-red-600">{userData.heartRate} BPM</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Today's Workout */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-6">
                            <Timer className="h-6 w-6 text-red-600" />
                            <h2 className="text-xl font-bold ml-2">Today's Workout</h2>
                        </div>
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                            <div>
                                <h4 className="font-semibold text-lg">{userData.nextWorkout}</h4>
                                <p className="text-gray-600">Duration: {userData.workoutMinutes} minutes</p>
                            </div>
                            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                                Start
                            </button>
                        </div>
                    </div>

                    {/* Weekly Progress */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-6">
                            <Target className="h-6 w-6 text-red-600" />
                            <h2 className="text-xl font-bold ml-2">Weekly Progress</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
                                    style={{ width: `${(userData.weeklyGoalProgress / 7) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-gray-600 font-medium">{userData.weeklyGoalProgress}/7 workout days completed</p>
                        </div>
                    </div>

                    {/* Weight Tracking */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-6">
                            <Weight className="h-6 w-6 text-red-600" />
                            <h2 className="text-xl font-bold ml-2">Weight Tracking</h2>
                        </div>
                        <div className="text-center bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-4xl font-bold mb-2 text-gray-800">{userData.weight} kg</h3>
                            <p className="text-gray-600">Last updated today</p>
                        </div>
                    </div>

                    {/* Upcoming Classes */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-6">
                            <Calendar className="h-6 w-6 text-red-600" />
                            <h2 className="text-xl font-bold ml-2">Upcoming Classes</h2>
                        </div>
                        <div className="space-y-4">
                            {userData.upcomingClasses.map((class_, index) => (
                                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h4 className="font-semibold text-lg">{class_.name}</h4>
                                        <p className="text-gray-600">{class_.time}</p>
                                    </div>
                                    <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
                                        Book
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;