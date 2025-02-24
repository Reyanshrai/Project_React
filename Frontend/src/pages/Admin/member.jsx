import React, { useState } from 'react';
import { Pencil, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const positions = [
  'Senior Trainer',
  'Personal Trainer',
  'Yoga Instructor',
  'Nutritionist',
  'Front Desk Staff',
  'Maintenance Staff'
];

const initialEmployees = [
  {
    id: '1',
    name: 'John Smith',
    position: 'Senior Trainer',
    email: 'john.smith@gym.com',
    phone: '(555) 123-4567',
    joinDate: '2024-12-15',
    salary: 45000,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    position: 'Yoga Instructor',
    email: 'sarah.j@gym.com',
    phone: '(555) 234-5678',
    joinDate: '2025-01-10',
    salary: 38000,
    status: 'Active'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    position: 'Nutritionist',
    email: 'mike.w@gym.com',
    phone: '(555) 345-6789',
    joinDate: '2025-02-01',
    salary: 42000,
    status: 'Active'
  }
];

function Members() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmed) return;

    setEmployees(employees.filter(emp => emp.id !== id));
    toast.success('Employee deleted successfully');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingEmployee) return;

    if (editingEmployee.id) {
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? editingEmployee : emp
      ));
      toast.success('Employee updated successfully');
    } else {
      const newEmployee = {
        ...editingEmployee,
        id: String(employees.length + 1)
      };
      setEmployees([...employees, newEmployee]);
      toast.success('Employee added successfully');
    }
    setEditingEmployee(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Gym Employees</h2>
            <button
              onClick={() => setEditingEmployee({
                id: '',
                name: '',
                position: '',
                email: '',
                phone: '',
                joinDate: new Date().toISOString().split('T')[0],
                salary: 0,
                status: 'Active'
              })}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Add Employee
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Position</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Join Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Salary</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${employee.salary.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
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

      {/* Edit Employee Modal */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              {editingEmployee.id ? 'Edit Employee' : 'Add Employee'}
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={editingEmployee.name}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <select
                    value={editingEmployee.position}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  >
                    <option value="">Select position</option>
                    {positions.map(position => (
                      <option key={position} value={position}>{position}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editingEmployee.email}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={editingEmployee.phone}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Join Date</label>
                  <input
                    type="date"
                    value={editingEmployee.joinDate}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, joinDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Salary</label>
                  <input
                    type="number"
                    value={editingEmployee.salary}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, salary: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={editingEmployee.status}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  {editingEmployee.id ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Members;