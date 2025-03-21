import { useState, useEffect } from 'react';
import Sidebar from '../../components/AdminSidebar';
import {GymMembers,TrainersManagement,Payments} from './index';
import AddTrainerModal from '../../components/AddTrainerModal';
import { Users, LayoutDashboard, Pencil, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from '../../config/axios';

// Initial mock data
const initialTrainers = [
  { id: 1, fullName: 'John Smith', position: 'Senior Trainer', phoneNo: '1234567890', timeToWork: '9 AM to 5 PM' },
  { id: 2, fullName: 'Sarah Johnson', position: 'Yoga Instructor', phoneNo: '2345678901', timeToWork: '10 AM to 6 PM' },
  { id: 3, fullName: 'Mike Wilson', position: 'Personal Trainer', phoneNo: '3456789012', timeToWork: '8 AM to 4 PM' }
];

function AdminDashboard() {
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

    fetchUsers();

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
      }
    };

    fetchTrainers();
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
    }
    if (activeTab === 'trainers') return <TrainersManagement />;
    if (activeTab === 'gym-members') return <GymMembers />;
    if (activeTab === 'payment') return <Payments />;
    if (activeTab === 'trainer') {
      return (
        <Trainers
          trainers={trainers}
          onAddTrainer={() => setShowAddTrainer(true)}
        />
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 z-50 p-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none"
          aria-label="Toggle sidebar menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Sidebar with responsive behavior */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed inset-0 z-40 md:relative md:inset-auto`}>
        {/* Overlay for mobile */}
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
        
        {/* Actual sidebar */}
        <div className="fixed md:relative h-full w-64 max-w-[80%] z-50 md:z-auto shadow-lg">
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }}
          />
        </div>
      </div>
      
      <div className="flex-1 p-4 sm:p-6 md:p-8 mt-12 md:mt-0">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 p-4 rounded-lg text-red-700">
            {error}
          </div>
        ) : (
          renderMainContent()
        )}

        <AddTrainerModal
          show={showAddTrainer}
          onClose={() => setShowAddTrainer(false)}
          onSubmit={handleAddTrainer}
          trainer={newTrainer}
          onTrainerChange={handleTrainerChange}
        />

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;