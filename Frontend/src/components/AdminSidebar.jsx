import React from 'react';
import { Users, LayoutDashboard, Dumbbell, LogOut, Wallet, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import toast from 'react-hot-toast';

function Sidebar({ activeTab, onTabChange }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/admins/logout');
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <div className="w-64 bg-red-600 text-white p-6 h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-8">
        <Dumbbell size={32} />
        <div>
          <h1 className="text-xl font-bold">GYM...</h1>
          <p className="text-sm">FITNESS FOR ALL</p>
        </div>
      </div>

      <nav className="space-y-4">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`flex items-center gap-2 text-xl w-full py-2 ${
            activeTab === 'dashboard' ? 'bg-red-700 rounded-lg px-2' : ''
          }`}
        >
          <LayoutDashboard size={24} />
          Dashboard
        </button>
        <button
          onClick={() => onTabChange('trainers')}
          className={`flex items-center gap-2 text-xl w-full py-2 ${
            activeTab === 'trainers' ? 'bg-red-700 rounded-lg px-2' : ''
          }`}
        >
          <Dumbbell size={24} />
          Trainers
        </button>
        <button
          onClick={() => onTabChange('gym-members')}
          className={`flex items-center gap-2 text-xl w-full py-2 ${
            activeTab === 'gym-members' ? 'bg-red-700 rounded-lg px-2' : ''
          }`}
        >
          <UserPlus size={24} />
          Gym Members
        </button>
        <button
          onClick={() => onTabChange('payment')}
          className={`flex items-center gap-2 text-xl w-full py-2 ${
            activeTab === 'payment' ? 'bg-red-700 rounded-lg px-2' : ''
          }`}
        >
          <Wallet size={24} />
          Payment
        </button>
      </nav>

      <div className="mt-auto pt-8">
        <div className="flex flex-col items-center">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=faces"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2"
          />
          <h2 className="text-xl font-bold mb-4">Vivek</h2>
          <button 
            onClick={handleLogout}
            className="bg-gray-200 text-black px-6 py-2 rounded-full font-semibold flex items-center gap-2">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;