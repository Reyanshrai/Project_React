import { useContext } from 'react';
import {UserContext} from "../context/userContext";
import { Activity, Calendar, Heart, TrendingUp, Weight, Timer, Target } from 'lucide-react';

const FitnessDashboard = () => {

  const {user,logout} = useContext(UserContext);

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}</h1>
          {/* <p className="text-gray-600">Let&apos;s crush today&apos;s goals!</p> */}
          <button className='bg-red-600 text-white p-2 rounded-full font-bold '>Logout</button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Steps Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Daily Steps</p>
                <h3 className="text-2xl font-bold">{userData.dailySteps.toLocaleString()}</h3>
              </div>
            </div>
          </div>

          {/* Calories Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Calories Burned</p>
                <h3 className="text-2xl font-bold">{userData.calories} kcal</h3>
              </div>
            </div>
          </div>

          {/* Heart Rate Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Heart Rate</p>
                <h3 className="text-2xl font-bold">{userData.heartRate} BPM</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Workout */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Timer className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-bold ml-2">Today&apos;s Workout</h2>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{userData.nextWorkout}</h4>
                <p className="text-sm text-gray-600">Duration: {userData.workoutMinutes} minutes</p>
              </div>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Start
              </button>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Target className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-bold ml-2">Weekly Progress</h2>
            </div>
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(userData.weeklyGoalProgress / 7) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{userData.weeklyGoalProgress}/7 workout days completed</p>
            </div>
          </div>

          {/* Weight Tracking */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Weight className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-bold ml-2">Weight Tracking</h2>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">{userData.weight} kg</h3>
              <p className="text-sm text-gray-600">Last updated today</p>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-bold ml-2">Upcoming Classes</h2>
            </div>
            <div className="space-y-4">
              {userData.upcomingClasses.map((class_, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <h4 className="font-semibold">{class_.name}</h4>
                    <p className="text-sm text-gray-600">{class_.time}</p>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
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

export default FitnessDashboard;