import React, { useRef } from 'react';
import { X } from 'lucide-react';
import FormInput from './FormInput';

function TrainerForm({ formData, setFormData, onSubmit, loading, submitButtonText, onCancel, isFormEditing, setIsFormEditing, focusedElementRef }) {
  const formRef = useRef(null);
  
  const handleInputChange = (e) => {
    focusedElementRef.current = e.target.id;
    setIsFormEditing(true);
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCertificationChange = (e, index) => {
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

  const handleFormSubmit = (e) => {
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
    
    onSubmit(e);
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleFormSubmit} 
      className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Full Name - Required */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
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

      {/* Email - Required, Unique */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
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

      {/* Phone Number - Required */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
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

      {/* Gender - Required, Enum */}
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
          Gender <span className="text-red-500">*</span>
        </label>
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

      {/* Specialization - Required */}
      <div>
        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
          Specialization <span className="text-red-500">*</span>
        </label>
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

      {/* Experience - Required, Number */}
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
          Experience (years) <span className="text-red-500">*</span>
        </label>
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

      {/* Working Hours - Required */}
      <div>
        <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700 mb-1">
          Working Hours <span className="text-red-500">*</span>
        </label>
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

      {/* Date of Birth - Required */}
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth <span className="text-red-500">*</span>
        </label>
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

      {/* Salary - Required, Number */}
      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
          Salary <span className="text-red-500">*</span>
        </label>
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
          step="any"
        />
      </div>

      {/* Status - Required, Enum with Default */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status <span className="text-red-500">*</span>
        </label>
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

      {/* Address - Required, Span 2 columns */}
      <div className="md:col-span-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address <span className="text-red-500">*</span>
        </label>
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

      {/* Certifications - Array of strings, Optional */}
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

      {/* Bio - Optional, Span 2 columns */}
      <div className="md:col-span-2">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
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

      {/* Form Buttons - Span 2 columns */}
      <div className="md:col-span-2 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
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
}

export default TrainerForm; 