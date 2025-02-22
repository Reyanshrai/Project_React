import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const initialPayments = [
  { id: '1', member_id: '1', member_name: 'John Doe', amount: 100, date: '2025-02-15', status: 'Paid' },
  { id: '2', member_id: '2', member_name: 'Jane Smith', amount: 75, date: '2025-02-14', status: 'Pending' },
  { id: '3', member_id: '3', member_name: 'Mike Johnson', amount: 100, date: '2025-02-13', status: 'Paid' }
];

const members = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Mike Johnson' }
];

function Payment() {
  const [payments, setPayments] = useState(initialPayments);
  const [editingPayment, setEditingPayment] = useState(null);

  const handleEdit = (payment) => {
    setEditingPayment(payment);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this payment?');
    if (!confirmed) return;

    setPayments(payments.filter(payment => payment.id !== id));
    toast.success('Payment deleted successfully');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingPayment) return;

    if (editingPayment.id) {
      setPayments(payments.map(payment => 
        payment.id === editingPayment.id ? editingPayment : payment
      ));
      toast.success('Payment updated successfully');
    } else {
      const selectedMember = members.find(m => m.id === editingPayment.member_id);
      const newPayment = {
        ...editingPayment,
        id: String(payments.length + 1),
        member_name: selectedMember ? selectedMember.name : ''
      };
      setPayments([...payments, newPayment]);
      toast.success('Payment added successfully');
    }
    setEditingPayment(null);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Payments</h2>
        <button
          onClick={() => setEditingPayment({ id: '', member_id: '', member_name: '', amount: 0, date: '', status: 'Pending' })}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Add Payment
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Member</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="px-6 py-4 text-sm text-gray-900">{payment.member_name}</td>
              <td className="px-6 py-4 text-sm text-gray-900">${payment.amount}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{payment.date}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {payment.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <button onClick={() => handleEdit(payment)} className="text-blue-600 hover:text-blue-800 mr-2">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(payment.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editingPayment.id ? 'Edit Payment' : 'Add Payment'}</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Member</label>
                <select
                  value={editingPayment.member_id}
                  onChange={(e) => {
                    const selectedMember = members.find(m => m.id === e.target.value);
                    setEditingPayment({ ...editingPayment, member_id: e.target.value, member_name: selectedMember ? selectedMember.name : '' });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                >
                  <option value="">Select a member</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  value={editingPayment.amount}
                  onChange={(e) => setEditingPayment({ ...editingPayment, amount: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={editingPayment.date}
                  onChange={(e) => setEditingPayment({ ...editingPayment, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setEditingPayment(null)} className="px-4 py-2 text-gray-700 hover:text-gray-900">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">{editingPayment.id ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;