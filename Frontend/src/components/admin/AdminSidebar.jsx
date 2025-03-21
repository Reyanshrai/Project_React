import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import toast from 'react-hot-toast';

function Sidebar({ isOpen, toggleSidebar, activeTab, setActiveTab, menuItems }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/admins/logout');
      // Clear admin-specific tokens and data
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_data');
      
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear local storage
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_data');
      toast.error('Logout failed');
      navigate('/admin/login');
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <div className={`fixed md:static top-0 left-0 z-40 h-screen  w-64 bg-red-600 text-white p-6 shadow-lg transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} overflow-y-auto flex flex-col`}>
      <div className="flex items-center justify-between mb-8">
        <div className="text-white">
          <h1 className="text-xl font-bold">GYM...</h1>
          <p className="text-sm">FITNESS FOR ALL</p>
        </div>
        <button 
          className="md:hidden text-white p-2 hover:bg-red-700 rounded-full"
          onClick={toggleSidebar}
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="space-y-4 flex-grow">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={`flex items-center gap-2 text-xl w-full py-2 px-2 transition-colors duration-200 hover:bg-red-700 hover:rounded-lg ${
              activeTab === item.id ? 'bg-red-700 rounded-lg' : ''
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
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
            className="bg-gray-200 text-black px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-300 transition-colors duration-200">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;