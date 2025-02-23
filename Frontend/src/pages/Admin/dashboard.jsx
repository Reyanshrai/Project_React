import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Members from './member';
import Payments from './payment';
import Trainers from './trainer';
import AddTrainerModal from '../../components/AddTrainerModal';
import { Users, LayoutDashboard, Pencil, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

// Initial mock data
const initialTrainers = [
  { id: 1, fullName: 'John Smith', position: 'Senior Trainer', phoneNo: '1234567890', timeToWork: '9 AM to 5 PM' },
  { id: 2, fullName: 'Sarah Johnson', position: 'Yoga Instructor', phoneNo: '2345678901', timeToWork: '10 AM to 6 PM' },
  { id: 3, fullName: 'Mike Wilson', position: 'Personal Trainer', phoneNo: '3456789012', timeToWork: '8 AM to 4 PM' }
];

const initialUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', joinDate: '2025-01-15', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', joinDate: '2025-02-01', status: 'Active' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2025-02-10', status: 'Inactive' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', joinDate: '2025-02-15', status: 'Active' },
  { id: '5', name: 'Tom Brown', email: 'tom@example.com', joinDate: '2025-02-20', status: 'Active' },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddTrainer, setShowAddTrainer] = useState(false);
  const [trainers, setTrainers] = useState(initialTrainers);
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [newTrainer, setNewTrainer] = useState({
    fullName: '',
    position: '',
    phoneNo: '',
    timeToWork: ''
  });

  const stats = {
    membersCount: users.length,
    trainersCount: trainers.length,
    totalRevenue: 2500
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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

  const renderMainContent = () => {
    if (activeTab === 'dashboard') {
      return (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Members</h3>
              <p className="text-3xl font-bold">{stats.membersCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Trainers</h3>
              <p className="text-3xl font-bold">{stats.trainersCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold">${stats.totalRevenue}</p>
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
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Join Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.joinDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
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
    if (activeTab === 'members') return <Members />;
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
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
        </div>

        {renderMainContent()}

        <AddTrainerModal
          show={showAddTrainer}
          onClose={() => setShowAddTrainer(false)}
          onSubmit={handleAddTrainer}
          trainer={newTrainer}
          onTrainerChange={handleTrainerChange}
        />

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
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