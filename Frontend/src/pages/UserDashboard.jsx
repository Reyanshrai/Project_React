import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/userContext";
import axios from '../config/axios'; // Assuming you have axios configured
import toast from 'react-hot-toast'; // For notifications
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsGrid from '../components/dashboard/StatsGrid';
import TodaysWorkout from '../components/dashboard/TodaysWorkout';
import WeeklyProgress from '../components/dashboard/WeeklyProgress';
import WeightTracking from '../components/dashboard/WeightTracking';
import UpcomingClasses from '../components/dashboard/UpcomingClasses';
import SubscriptionPlans from '../components/dashboard/SubscriptionPlans';
import DietPlans from '../components/dashboard/DietPlans';

const Dashboard = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [dietPlans, setDietPlans] = useState([]);
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState(null);

    // Check if user is logged in
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !user._id) {
                setError('User not authenticated properly');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`/users/profile/${user._id}`);
                setUserData(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data');
                toast.error('Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    // Fetch subscription plans
    useEffect(() => {
        const fetchSubscriptionPlans = async () => {
            try {
                const response = await axios.get('/api/subscriptions/plans');
                setSubscriptionPlans(response.data.plans);
            } catch (err) {
                console.error('Error fetching subscription plans:', err);
                toast.error('Failed to load subscription plans');
            }
        };

        fetchSubscriptionPlans();
    }, []);

    // Fetch diet plans
    useEffect(() => {
        const fetchDietPlans = async () => {
            try {
                const response = await axios.get('/api/diet-plans');
                setDietPlans(response.data.plans);
            } catch (err) {
                console.error('Error fetching diet plans:', err);
                toast.error('Failed to load diet plans');
            }
        };

        fetchDietPlans();
    }, []);

    // Fetch upcoming classes
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('/api/classes/upcoming');
                setClasses(response.data.classes);
            } catch (err) {
                console.error('Error fetching classes:', err);
                toast.error('Failed to load upcoming classes');
            }
        };

        fetchClasses();
    }, []);

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.get('/users/logout');
            logout();
            toast.success('Logged out successfully');
            navigate("/home");
        } catch (err) {
            console.error('Logout error:', err);
            toast.error('Failed to logout');
        }
    };

    // Update user's weight
    const updateWeight = async (newWeight) => {
        try {
            await axios.patch(`/users/${user._id}/weight`, { weight: newWeight });
            // Update local state
            setUserData(prev => ({
                ...prev,
                weight: newWeight
            }));
            toast.success('Weight updated successfully');
        } catch (err) {
            console.error('Error updating weight:', err);
            toast.error('Failed to update weight');
        }
    };

    // Book a class
    const bookClass = async (classId) => {
        try {
            await axios.post('/api/classes/book', { classId });
            toast.success('Class booked successfully');
            // Refetch classes to update availability
            const response = await axios.get('/api/classes/upcoming');
            setClasses(response.data.classes);
        } catch (err) {
            console.error('Error booking class:', err);
            toast.error('Failed to book class');
        }
    };

    // Update subscription
    const updateSubscription = async (planId) => {
        try {
            await axios.post('/api/subscriptions', { planId });
            toast.success('Subscription updated successfully');
            // Refetch user data to get updated subscription
            const response = await axios.get(`/users/profile/${user._id}`);
            setUserData(response.data);
        } catch (err) {
            console.error('Error updating subscription:', err);
            toast.error('Failed to update subscription');
        }
    };

    // Update diet plan
    const updateDietPlan = async (planId) => {
        try {
            await axios.post('/api/diet-plans/subscribe', { planId });
            toast.success('Diet plan updated successfully');
            // Refetch user data to get updated diet plan
            const response = await axios.get(`/users/profile/${user._id}`);
            setUserData(response.data);
        } catch (err) {
            console.error('Error updating diet plan:', err);
            toast.error('Failed to update diet plan');
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
            </div>
        );
    }

    // Show error state
    if (error || !userData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
                    <p className="text-gray-600 mb-6">{error || "Failed to load user data"}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <DashboardHeader 
                    userName={userData.firstname} 
                    onLogout={handleLogout} 
                />

                {/* <StatsGrid 
                    steps={userData.stats?.dailySteps || 0}
                    calories={userData.stats?.caloriesBurned || 0}
                    heartRate={userData.stats?.heartRate || 0}
                /> */}

                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <TodaysWorkout 
                        workoutName={userData.workout?.name || "No workout scheduled"} 
                        duration={userData.workout?.duration || 0} 
                    />
                    <WeeklyProgress 
                        progress={userData.progress?.weeklyWorkouts || 0} 
                    />
                </div> */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <WeightTracking 
                        weight={userData.weight || 0} 
                        onUpdateWeight={updateWeight}
                    />
                    <UpcomingClasses 
                        classes={classes} 
                        onBookClass={bookClass}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SubscriptionPlans 
                        currentSubscription={userData.subscription || {}} 
                        availablePlans={subscriptionPlans}
                        onUpdateSubscription={updateSubscription}
                    />
                    <DietPlans 
                        dietPlan={userData.dietPlan || {}} 
                        availablePlans={dietPlans}
                        onUpdateDietPlan={updateDietPlan}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;