import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Search, Plus, X, Apple } from 'lucide-react';
import axios from '../../config/axios';
import toast from 'react-hot-toast';

function DietPlanManagement() {
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: 30,
    meals: [
      { type: 'Breakfast', options: [''] },
      { type: 'Lunch', options: [''] },
      { type: 'Dinner', options: [''] }
    ]
  });

  useEffect(() => {
    fetchDietPlans();
  }, []);

  const fetchDietPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/diet-plans');
      if (response.data.plans) {
        setDietPlans(response.data.plans);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching diet plans:', error);
      setError('Failed to fetch diet plans. Please try again later.');
      setLoading(false);
      toast.error('Failed to load diet plans');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMealOptionChange = (mealIndex, optionIndex, value) => {
    const updatedMeals = [...formData.meals];
    updatedMeals[mealIndex].options[optionIndex] = value;
    setFormData({ ...formData, meals: updatedMeals });
  };

  const addMealOption = (mealIndex) => {
    const updatedMeals = [...formData.meals];
    updatedMeals[mealIndex].options.push('');
    setFormData({ ...formData, meals: updatedMeals });
  };

  const removeMealOption = (mealIndex, optionIndex) => {
    const updatedMeals = [...formData.meals];
    updatedMeals[mealIndex].options.splice(optionIndex, 1);
    setFormData({ ...formData, meals: updatedMeals });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: 30,
      meals: [
        { type: 'Breakfast', options: [''] },
        { type: 'Lunch', options: [''] },
        { type: 'Dinner', options: [''] }
      ]
    });
  };

  const handleAddDietPlan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/diet-plans', formData);
      toast.success('Diet plan added successfully');
      fetchDietPlans();
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Error adding diet plan:', error);
      toast.error(error.response?.data?.error || 'Failed to add diet plan');
    }
  };

  const handleEditDietPlan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/diet-plans/${selectedPlan.id}`, formData);
      toast.success('Diet plan updated successfully');
      fetchDietPlans();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating diet plan:', error);
      toast.error(error.response?.data?.error || 'Failed to update diet plan');
    }
  };

  const handleDeleteDietPlan = async (id) => {
    if (window.confirm('Are you sure you want to delete this diet plan?')) {
      try {
        await axios.delete(`/api/diet-plans/${id}`);
        toast.success('Diet plan deleted successfully');
        fetchDietPlans();
      } catch (error) {
        console.error('Error deleting diet plan:', error);
        toast.error(error.response?.data?.error || 'Failed to delete diet plan');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDietPlans = dietPlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Diet Plans Management</h2>
        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
        >
          <Plus size={16} className="mr-2" />
          Add Diet Plan
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search diet plans..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading diet plans...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDietPlans.length > 0 ? (
                filteredDietPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{plan.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">${plan.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{plan.duration} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedPlan(plan);
                          setFormData({
                            name: plan.name,
                            description: plan.description,
                            price: plan.price,
                            duration: plan.duration,
                            meals: plan.meals
                          });
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteDietPlan(plan.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No diet plans found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Diet Plan Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add New Diet Plan</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddDietPlan}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                  Duration (days)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  min="1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Meal Options
                </label>
                {formData.meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="mb-4 p-4 border border-gray-200 rounded-md">
                    <h4 className="font-bold text-green-700 mb-2">{meal.type}</h4>
                    {meal.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleMealOptionChange(mealIndex, optionIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder={`Enter ${meal.type} option`}
                          required
                        />
                        {meal.options.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMealOption(mealIndex, optionIndex)}
                            className="ml-2 p-2 text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addMealOption(mealIndex)}
                      className="flex items-center text-green-600 hover:text-green-800"
                    >
                      <Plus size={16} className="mr-1" />
                      Add {meal.type} Option
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Add Diet Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Diet Plan Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Edit Diet Plan</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditDietPlan}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-name">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-price">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="edit-price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-description">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-duration">
                  Duration (days)
                </label>
                <input
                  type="number"
                  id="edit-duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  min="1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Meal Options
                </label>
                {formData.meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="mb-4 p-4 border border-gray-200 rounded-md">
                    <h4 className="font-bold text-green-700 mb-2">{meal.type}</h4>
                    {meal.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleMealOptionChange(mealIndex, optionIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder={`Enter ${meal.type} option`}
                          required
                        />
                        {meal.options.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMealOption(mealIndex, optionIndex)}
                            className="ml-2 p-2 text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addMealOption(mealIndex)}
                      className="flex items-center text-green-600 hover:text-green-800"
                    >
                      <Plus size={16} className="mr-1" />
                      Add {meal.type} Option
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Update Diet Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DietPlanManagement; 