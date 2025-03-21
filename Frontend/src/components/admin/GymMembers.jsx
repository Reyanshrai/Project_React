import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Search, Plus, X } from 'lucide-react';
import axios from '../../config/axios';
import toast from 'react-hot-toast';

function GymMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMember, setNewMember] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: 'Male',
    dateOfBirth: '',
    address: '',
    membership: 'Basic',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    emergencyContact: {
      name: '',
      phoneNumber: '',
      relationship: ''
    },
    status: 'Active'
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/members');
      setMembers(response.data.members);
      setError(null);
    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to load members');
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/members', newMember);
      toast.success('Member added successfully');
      setShowAddMemberModal(false);
      resetForm();
      fetchMembers();
    } catch (err) {
      console.error('Error adding member:', err);
      toast.error(err.response?.data?.error || 'Failed to add member');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    
    try {
      setLoading(true);
      await axios.delete(`/members/${id}`);
      toast.success('Member deleted successfully');
      fetchMembers();
    } catch (err) {
      console.error('Error deleting member:', err);
      toast.error('Failed to delete member');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewMember(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setNewMember(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setNewMember({
      fullName: '',
      email: '',
      phoneNumber: '',
      gender: 'Male',
      dateOfBirth: '',
      address: '',
      membership: 'Basic',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
      emergencyContact: {
        name: '',
        phoneNumber: '',
        relationship: ''
      },
      status: 'Active'
    });
  };

  const filteredMembers = members.filter(member => 
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold">Gym Members</h2>
        <button
          onClick={() => setShowAddMemberModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-600">{error}</div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No members found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Phone</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Membership</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">End Date</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member._id}>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                      {member.fullName}
                      <div className="text-xs text-gray-500 md:hidden truncate max-w-[150px]">{member.email}</div>
                      <div className="text-xs text-gray-500 sm:hidden md:hidden">{member.phoneNumber}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm hidden md:table-cell">{member.email}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm hidden sm:table-cell">{member.phoneNumber}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm hidden md:table-cell">{member.membership}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm hidden lg:table-cell">
                      {new Date(member.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        member.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : member.status === 'Inactive' 
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm">
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteMember(member._id)}
                        aria-label="Delete member"
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b">
              <h3 className="text-lg sm:text-xl font-bold">Add New Member</h3>
              <button
                onClick={() => setShowAddMemberModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={newMember.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newMember.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={newMember.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={newMember.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={newMember.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={newMember.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  rows="2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Membership Type</label>
                <select
                  name="membership"
                  value={newMember.membership}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newMember.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={newMember.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={newMember.endDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div className="md:col-span-2 pt-4 border-t">
                <h4 className="font-medium mb-2">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="emergencyContact.name"
                      value={newMember.emergencyContact.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      name="emergencyContact.phoneNumber"
                      value={newMember.emergencyContact.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                    <input
                      type="text"
                      name="emergencyContact.relationship"
                      value={newMember.emergencyContact.relationship}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 w-full sm:w-auto"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GymMembers; 