// src/components/dashboard/DashboardHeader.jsx
import { LogOut } from 'lucide-react';

const DashboardHeader = ({ userName, onLogout }) => {
    return (
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 flex flex-wrap items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    Welcome back, {userName}
                </h1>
                <p className="text-gray-600">Track your fitness journey and achieve your goals</p>
            </div>
            <button 
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-400 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300" 
                onClick={onLogout}
            >
                <LogOut className="h-5 w-5" />
                Logout
            </button>
        </div>
    );
};

export default DashboardHeader;