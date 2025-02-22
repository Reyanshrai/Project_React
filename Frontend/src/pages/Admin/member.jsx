import React, { useState } from 'react';
import { Pencil, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

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

const positions = [
  'Senior Trainer',
  'Personal Trainer',
  'Yoga Instructor',
  'Nutritionist',
  'Front Desk Staff',
  'Maintenance Staff'
];

function Member() {
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
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.joinDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">${employee.salary.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <button onClick={() => handleEdit(employee)} className="text-blue-600 hover:text-blue-800 mr-2">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(employee.id)} className="text-red-600 hover:text-red-800">
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

export default Member;