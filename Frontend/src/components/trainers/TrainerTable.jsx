import React from 'react';
import { Edit, Trash2, Award } from 'lucide-react';

function TrainerTable({ trainers, onEdit, onDelete, loading, error }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (error) {
    return <div className="p-4 text-center text-red-600">{error}</div>;
  }
  
  if (trainers.length === 0) {
    return <div className="p-4 text-center text-gray-500">No trainers found</div>;
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Specialization</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Experience</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Working Hours</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {trainers.map((trainer) => (
            <tr key={trainer._id}>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{trainer.fullName}</div>
                    <div className="text-xs text-gray-500 md:hidden">{trainer.specialization}</div>
                    <div className="text-xs text-gray-500 sm:hidden">{trainer.experience} yrs</div>
                  </div>
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <div className="flex items-center">
                  <Award className="mr-2 text-yellow-500" size={16} />
                  <span className="text-xs sm:text-sm">{trainer.specialization}</span>
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell text-xs sm:text-sm">
                {trainer.experience} years
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell text-xs sm:text-sm">
                {trainer.phoneNumber}
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell text-xs sm:text-sm">
                {trainer.workingHours}
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  trainer.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : trainer.status === 'Inactive' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {trainer.status}
                </span>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(trainer)}
                    className="text-blue-600 hover:text-blue-900"
                    aria-label="Edit trainer"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(trainer._id)}
                    className="text-red-600 hover:text-red-900"
                    aria-label="Delete trainer"
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
  );
}

export default TrainerTable; 