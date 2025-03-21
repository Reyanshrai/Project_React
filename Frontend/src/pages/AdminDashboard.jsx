import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/AdminSidebar';
import {GymMembers, TrainersManagement, Payments, SubscriptionManagement, DietPlanManagement, ClassManagement} from '../components/admin/index';
import AddTrainerModal from '../components/AddTrainerModal';
import { Users, LayoutDashboard, Pencil, Trash2, Search, CreditCard, Apple, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from '../config/axios';

// Initial mock data if API fails
const initialTrainers = [
  { id: 1, fullName: 'John Smith', position: 'Senior Trainer', phoneNo: '1234567890', timeToWork: '9 AM to 5 PM' },
  { id: 2, fullName: 'Sarah Johnson', position: 'Yoga Instructor', phoneNo: '2345678901', timeToWork: '10 AM to 6 PM' },
  { id: 3, fullName: 'Mike Wilson', position: 'Personal Trainer', phoneNo: '3456789012', timeToWork: '8 AM to 4 PM' }
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddTrainer, setShowAddTrainer] = useState(false);
  const [trainers, setTrainers] = useState(initialTrainers);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [newTrainer, setNewTrainer] = useState({
    fullName: '',
    position: '',
    phoneNo: '',
    timeToWork: ''
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check admin authentication
  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');
    if (!adminToken) {
      toast.error('Please login as admin');
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/users/all');
        const userData = response.data.users.map(user => {
          // Create a sensible join date even if created_at or createdAt is missing
          let joinDate;
          try {
            joinDate = user.created_at || user.createdAt 
              ? new Date(user.created_at || user.createdAt).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0]; // Default to today if no date available
          } catch (e) {
            joinDate = new Date().toISOString().split('T')[0];
          }
          
          return {
            id: user._id || user.id,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            joinDate,
            status: 'Active'
          };
        });
        setUsers(userData);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again.');
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    const fetchTrainers = async () => {
      try {
        const response = await axios.get('/trainers');
        if (response.data && response.data.trainers) {
          const trainerData = response.data.trainers.map(trainer => ({
            id: trainer._id,
            fullName: trainer.fullName,
            email: trainer.email,
            phoneNo: trainer.phoneNumber,
            position: trainer.specialization,
            timeToWork: trainer.workingHours
          }));
          setTrainers(trainerData);
        }
      } catch (err) {
        console.error('Error fetching trainers:', err);
        toast.error('Failed to load trainers');
        // Keep the initial trainers data as fallback
      }
    };

    if (localStorage.getItem('admin_token')) {
      fetchUsers();
      fetchTrainers();
    }
  }, []);

  const stats = {
    membersCount: users.length,
    trainersCount: trainers.length,
    totalRevenue: 2500
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTrainer = (e) => {
    e.preventDefault();
    
    const newTrainerWithId = {
      id: trainers.length + 1,
      ...newTrainer
    };

    setTrainers([...trainers, newTrainerWithId]);
    setShowAddTrainer(false);
    setNewTrainer({ fullName: '', position: '', phoneNo: '', timeToWork: '' });
  };

  const handleTrainerChange = (field, value) => {
    setNewTrainer(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    setUsers(users.filter(user => user.id !== id));
    toast.success('User deleted successfully');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingUser) return;

    setUsers(users.map(user => 
      user.id === editingUser.id ? editingUser : user
    ));
    
    setEditingUser(null);
    toast.success('User updated successfully');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderMainContent = () => {
    if (activeTab === 'dashboard') {
      return (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Members</h3>
              <p className="text-2xl sm:text-3xl font-bold">{stats.membersCount}</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Trainers</h3>
              <p className="text-2xl sm:text-3xl font-bold">{stats.trainersCount}</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow sm:col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
              <p className="text-2xl sm:text-3xl font-bold">${stats.totalRevenue}</p>
            </div>
          </div>

          {/* User List Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold mb-4">Users</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden sm:table-cell">Join Date</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 hidden sm:table-cell">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{user.name}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 truncate max-w-[120px] sm:max-w-none">{user.email}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden sm:table-cell">{user.joinDate}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm hidden sm:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="Edit user"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Delete user"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 'members') {
      return <GymMembers />;
    } else if (activeTab === 'trainers') {
      return <TrainersManagement />;
    } else if (activeTab === 'payments') {
      return <Payments />;
    } else if (activeTab === 'subscriptions') {
      return <SubscriptionManagement />;
    } else if (activeTab === 'diet-plans') {
      return <DietPlanManagement />;
    } else if (activeTab === 'classes') {
      return <ClassManagement />;
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={[
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
          { id: 'members', label: 'Members', icon: <Users size={20} /> },
          { id: 'trainers', label: 'Trainers', icon: <Users size={20} /> },
          { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
          { id: 'subscriptions', label: 'Subscriptions', icon: <CreditCard size={20} /> },
          { id: 'diet-plans', label: 'Diet Plans', icon: <Apple size={20} /> },
          { id: 'classes', label: 'Classes', icon: <Calendar size={20} /> }
        ]}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <button 
            className="block md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="h-6 w-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="flex items-center">
            <span className="mr-2">Welcome, Admin</span>
          </div>
        </header>
        
        {/* Main */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;