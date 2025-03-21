import React, { useState, useEffect, useRef } from 'react';
import { Edit, Trash2, Search, Plus, X, Award } from 'lucide-react';
import axios from '../../config/axios';
import toast from 'react-hot-toast';

// Import the components we created
import SearchBar from '../../components/trainers/SearchBar';
import TrainerTable from '../../components/trainers/TrainerTable';
import ModalComponent from '../../components/trainers/ModalComponent';
import TrainerForm from '../../components/trainers/TrainerForm';

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

  // Add effect to restore focus after state updates
  useEffect(() => {
    if (isFormEditing && focusedElementRef.current) {
      setTimeout(() => {
        if (typeof focusedElementRef.current === 'string') {
          const element = document.getElementById(focusedElementRef.current);
          if (element) {
            element.focus();
            if (element.tagName === 'INPUT' && element.type === 'text') {
              const len = element.value.length;
              element.setSelectionRange(len, len);
            }
          }
        } else if (focusedElementRef.current.focus) {
          focusedElementRef.current.focus();
        }
        
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
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TrainerTable 
          trainers={filteredTrainers} 
          onEdit={handleEditModalOpen} 
          onDelete={handleDeleteTrainer} 
          loading={loading && !showAddModal && !showEditModal}
          error={error} 
        />
      </div>

      {/* Add Trainer Modal */}
      <ModalComponent 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        title="Add New Trainer"
      >
        <TrainerForm 
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddTrainer} 
          loading={loading}
          submitButtonText="Add Trainer" 
          onCancel={() => setShowAddModal(false)}
          isFormEditing={isFormEditing}
          setIsFormEditing={setIsFormEditing}
          focusedElementRef={focusedElementRef}
        />
      </ModalComponent>

      {/* Edit Trainer Modal */}
      <ModalComponent 
        isOpen={showEditModal && selectedTrainer} 
        onClose={() => setShowEditModal(false)} 
        title="Edit Trainer"
      >
        <TrainerForm 
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleEditTrainer} 
          loading={loading}
          submitButtonText="Update Trainer" 
          onCancel={() => setShowEditModal(false)}
          isFormEditing={isFormEditing}
          setIsFormEditing={setIsFormEditing}
          focusedElementRef={focusedElementRef}
        />
      </ModalComponent>
    </div>
  );
}

export default TrainersManagement; 