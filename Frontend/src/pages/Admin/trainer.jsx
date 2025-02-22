import React from 'react';

function Trainer({ trainers, onAddTrainer }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Trainers</h2>
        <button
          onClick={onAddTrainer}
          className="text-blue-600 hover:text-blue-800"
        >
          +Add Trainer
        </button>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Full Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Position</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone No</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time to work</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {trainers.map((trainer) => (
            <tr key={trainer.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.position}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.phoneNo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.timeToWork}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Trainer;