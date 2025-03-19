import React, { useState, useEffect, useRef } from 'react';
import { Edit, Trash2, Search, Plus, X, Award } from 'lucide-react';
import axios from '../../config/axios';
import toast from 'react-hot-toast';

function TrainersManagement() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: 'Male',
    specialization: '',
    experience: '',
    workingHours: '',
    dateOfBirth: '',
    address: '',
    certifications: [],
    salary: '',
    status: 'Active',
    bio: ''
  });
  
  // Track whether the form is currently being edited
  const [isFormEditing, setIsFormEditing] = useState(false);
  const formRef = useRef(null);

  // Store currently focused element to maintain focus
  const focusedElementRef = useRef(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/trainers');
      setTrainers(response.data.trainers);
      setError(null);
    } catch (err) {
      console.error('Error fetching trainers:', err);
      setError('Failed to load trainers');
      toast.error('Failed to load trainers');
    } finally {
      setLoading(false);
    }
  };

  // Revised input handler with focus preservation
  const handleInputChange = (e) => {
    // Store the current focused element ID
    focusedElementRef.current = e.target.id;
    
    const { name, value } = e.target;
    
    // Set the isFormEditing flag to prevent focus shifts
    setIsFormEditing(true);
    
    // Update the form data with functional state update
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Similar change for certification handler
  const handleCertificationChange = (e, index) => {
    // Store the current focused element
    focusedElementRef.current = e.target;
    
    setIsFormEditing(true);
    
    setFormData(prev => {
      const newCertifications = [...prev.certifications];
      newCertifications[index] = e.target.value;
      return { ...prev, certifications: newCertifications };
    });
  };

  const addCertificationField = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, '']
    }));
  };

  const removeCertificationField = (index) => {
    setFormData(prev => {
      const newCertifications = [...prev.certifications];
      newCertifications.splice(index, 1);
      return { ...prev, certifications: newCertifications };
    });
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      gender: 'Male',
      specialization: '',
      experience: '',
      workingHours: '',
      dateOfBirth: '',
      address: '',
      certifications: [],
      salary: '',
      status: 'Active',
      bio: ''
    });
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/trainers', formData);
      toast.success('Trainer added successfully');
      setShowAddModal(false);
      resetForm();
      fetchTrainers();
    } catch (err) {
      console.error('Error adding trainer:', err);
      toast.error(err.response?.data?.error || 'Failed to add trainer');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTrainer = async (e) => {
    e.preventDefault();
    if (!selectedTrainer) return;

    try {
      setLoading(true);
      await axios.put(`/trainers/${selectedTrainer._id}`, formData);
      toast.success('Trainer updated successfully');
      setShowEditModal(false);
      setSelectedTrainer(null);
      fetchTrainers();
    } catch (err) {
      console.error('Error updating trainer:', err);
      toast.error(err.response?.data?.error || 'Failed to update trainer');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this trainer?')) return;
    
    try {
      setLoading(true);
      await axios.delete(`/trainers/${id}`);
      toast.success('Trainer deleted successfully');
      fetchTrainers();
    } catch (err) {
      console.error('Error deleting trainer:', err);
      toast.error('Failed to delete trainer');
    } finally {
      setLoading(false);
    }
  };

  const handleAddModalOpen = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEditModalOpen = (trainer) => {
    setSelectedTrainer(trainer);
    setFormData({
      fullName: trainer.fullName || '',
      email: trainer.email || '',
      phoneNumber: trainer.phoneNumber || '',
      gender: trainer.gender || 'Male',
      specialization: trainer.specialization || '',
      experience: trainer.experience || '',
      workingHours: trainer.workingHours || '',
      dateOfBirth: trainer.dateOfBirth || '',
      address: trainer.address || '',
      certifications: trainer.certifications || [],
      salary: trainer.salary || '',
      status: trainer.status || 'Active',
      bio: trainer.bio || ''
    });
    setShowEditModal(true);
  };

  const filteredTrainers = trainers.filter(trainer => 
    trainer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      
      const form = e.target.form;
      if (!form) return;
      
      const focusableElements = Array.from(
        form.querySelectorAll('input, select, textarea, button[type="submit"]')
      ).filter(el => !el.disabled && !el.hidden && el.offsetParent !== null);
      
      const index = focusableElements.indexOf(e.target);
      if (index > -1 && index < focusableElements.length - 1) {
        focusableElements[index + 1].focus();
        
        if (focusableElements[index + 1].tagName === 'SELECT') {
          focusableElements[index + 1].dispatchEvent(new MouseEvent('mousedown'));
        }
      }
    }
  };

  const handleFormSubmit = (e, submitHandler) => {
    e.preventDefault();
    
    const form = e.target;
    if (!form.checkValidity()) {
      const invalidElements = Array.from(
        form.querySelectorAll('input:invalid, select:invalid, textarea:invalid')
      );
      
      if (invalidElements.length > 0) {
        invalidElements[0].focus();
        return;
      }
    }
    
    submitHandler(e);
  };

  // Update the FormInput component to properly handle focus
  const FormInput = ({ type, id, name, value, onChange, onKeyDown, ...props }) => {
    // Use a ref to maintain focus
    const inputRef = useRef(null);
    
    // Add useEffect to ensure the input stays focused when needed
    useEffect(() => {
      // If this input has focus when its value changes, it should keep focus
      if (document.activeElement === inputRef.current) {
        // Schedule a focus call for after the render cycle
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      }
    }, [value]); // This will run when the input value changes
    
    // Common props for all input types
    const commonProps = {
      ref: inputRef,
      id: id,
      name: name,
      value: value,
      onChange: onChange,
      onKeyDown: onKeyDown,
      // Add these event handlers to help maintain focus
      onFocus: () => {
        // Sometimes React can lose track of focus during re-renders
        if (inputRef.current) {
          // Set a flag we can use later if needed
          inputRef.current.dataset.hasFocus = 'true';
        }
      },
      onBlur: () => {
        // Clear the focus flag
        if (inputRef.current) {
          inputRef.current.dataset.hasFocus = 'false';
        }
      },
      ...props
    };
    
    // Return the appropriate input element based on type
    if (type === 'textarea') {
      return <textarea {...commonProps} />;
    } else if (type === 'select') {
      return (
        <select {...commonProps}>
          {props.children}
        </select>
      );
    } else {
      return <input type={type} {...commonProps} />;
    }
  };

  const TrainerForm = ({ onSubmit, formTitle, submitButtonText }) => (
    <form 
      ref={formRef}
      onSubmit={(e) => handleFormSubmit(e, onSubmit)} 
      className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <FormInput
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <FormInput
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          required
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <FormInput
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          required
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
        <FormInput
          type="select"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </FormInput>
      </div>

      <div>
        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
        <FormInput
          type="text"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          required
          placeholder="e.g., Yoga, Weight Training, Cardio"
        />
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
        <FormInput
          type="number"
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          required
          min="0"
        />
      </div>

      <div>
        <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
        <FormInput
          type="text"
          id="workingHours"
          name="workingHours"
          value={formData.workingHours}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          required
          placeholder="e.g., 9 AM to 5 PM"
        />
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <FormInput
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          required
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <FormInput
          type="textarea"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Tab' && !e.shiftKey) {
              return;
            } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              const form = e.target.form;
              if (!form) return;
              
              const focusableElements = Array.from(
                form.querySelectorAll('input, select, textarea, button[type="submit"]')
              ).filter(el => !el.disabled);
              
              const index = focusableElements.indexOf(e.target);
              if (index > -1 && index < focusableElements.length - 1) {
                focusableElements[index + 1].focus();
              }
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          rows="2"
          required
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Certifications
          <button 
            type="button" 
            onClick={addCertificationField}
            className="ml-2 text-red-600 hover:text-red-800"
          >
            + Add
          </button>
        </label>
        {formData.certifications.length === 0 && (
          <div className="text-sm text-gray-500 mb-2">No certifications added yet</div>
        )}
        {formData.certifications.map((cert, index) => (
          <div key={index} className="flex mb-2">
            <FormInput
              type="text"
              id={`certification-${index}`}
              name={`certification-${index}`}
              value={cert}
              onChange={(e) => handleCertificationChange(e, index)}
              onKeyDown={handleKeyDown}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="e.g., Personal Trainer Certification"
            />
            <button 
              type="button" 
              onClick={() => removeCertificationField(index)}
              className="ml-2 p-2 text-red-600 hover:text-red-800"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
        <FormInput
          type="number"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          required
          min="0"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <FormInput
          type="select"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </FormInput>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <FormInput
          type="textarea"
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Tab' && !e.shiftKey) {
              return;
            } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              const form = e.target.form;
              if (!form) return;
              
              const focusableElements = Array.from(
                form.querySelectorAll('input, select, textarea, button[type="submit"]')
              ).filter(el => !el.disabled);
              
              const index = focusableElements.indexOf(e.target);
              if (index > -1 && index < focusableElements.length - 1) {
                focusableElements[index + 1].focus();
              }
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          rows="3"
          placeholder="Brief description about the trainer"
        />
      </div>

      <div className="md:col-span-2 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
        <button
          type="button"
          onClick={() => showEditModal ? setShowEditModal(false) : setShowAddModal(false)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 w-full sm:w-auto"
          tabIndex={0}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 w-full sm:w-auto"
          disabled={loading}
          tabIndex={0}
        >
          {loading ? 'Processing...' : submitButtonText}
        </button>
      </div>
    </form>
  );

  // Add effect to restore focus after state updates
  useEffect(() => {
    // Only attempt to restore focus if we're editing the form and have a stored element
    if (isFormEditing && focusedElementRef.current) {
      // Use setTimeout to ensure the DOM has updated
      setTimeout(() => {
        // If it's a DOM element with an ID, get it by ID
        if (typeof focusedElementRef.current === 'string') {
          const element = document.getElementById(focusedElementRef.current);
          if (element) {
            element.focus();
            // For text inputs, maintain cursor position
            if (element.tagName === 'INPUT' && element.type === 'text') {
              const len = element.value.length;
              element.setSelectionRange(len, len);
            }
          }
        }
        // If it's a direct DOM reference
        else if (focusedElementRef.current.focus) {
          focusedElementRef.current.focus();
        }
        
        // Reset the editing flag
        setIsFormEditing(false);
      }, 0);
    }
  }, [formData, isFormEditing]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold">Trainers Management</h2>
        <button
          onClick={handleAddModalOpen}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
        >
          <Plus size={20} />
          Add Trainer
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {loading && !showAddModal && !showEditModal ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-600">{error}</div>
        ) : filteredTrainers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No trainers found</div>
        ) : (
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
                {filteredTrainers.map((trainer) => (
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
                          onClick={() => handleEditModalOpen(trainer)}
                          className="text-blue-600 hover:text-blue-900"
                          aria-label="Edit trainer"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTrainer(trainer._id)}
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
        )}
      </div>

      {/* Add Trainer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b">
              <h3 className="text-lg sm:text-xl font-bold">Add New Trainer</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <TrainerForm 
              onSubmit={handleAddTrainer} 
              formTitle="Add New Trainer" 
              submitButtonText="Add Trainer" 
            />
          </div>
        </div>
      )}

      {/* Edit Trainer Modal */}
      {showEditModal && selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b">
              <h3 className="text-lg sm:text-xl font-bold">Edit Trainer</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <TrainerForm 
              onSubmit={handleEditTrainer} 
              formTitle="Edit Trainer" 
              submitButtonText="Update Trainer" 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainersManagement; 