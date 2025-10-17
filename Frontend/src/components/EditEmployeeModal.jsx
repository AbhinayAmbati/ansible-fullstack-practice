import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { employeeAPI } from '../services/api';

const EditEmployeeModal = ({ employee, isOpen, onClose, onEmployeeUpdated, setMessage }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    department: '',
    designation: '',
    primarySkill: '',
    secondarySkill: '',
    skillRating: '',
    yearsOfExperience: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when employee prop changes
  useEffect(() => {
    if (employee && isOpen) {
      setFormData({
        employeeId: employee.employeeId || '',
        name: employee.name || '',
        department: employee.department || '',
        designation: employee.designation || '',
        primarySkill: employee.primarySkill || '',
        secondarySkill: employee.secondarySkill || '',
        skillRating: employee.skillRating || '',
        yearsOfExperience: employee.yearsOfExperience || '',
        email: employee.email || ''
      });
    }
  }, [employee, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert numeric fields to integers
      const employeeData = {
        ...formData,
        skillRating: parseInt(formData.skillRating),
        yearsOfExperience: parseInt(formData.yearsOfExperience)
      };

      await employeeAPI.updateEmployee(employee.id, employeeData);
      setMessage({ type: 'success', text: 'Employee updated successfully!' });
      onEmployeeUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating employee:', error);
      setMessage({ type: 'error', text: 'Failed to update employee. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Edit Employee</h2>
                <p className="text-blue-100 text-sm">Update employee information</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-white hover:text-gray-200 p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-200 disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee ID */}
            <div className="md:col-span-2">
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter Employee ID"
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter Full Name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter Email Address"
              />
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="IT">Information Technology</option>
              </select>
            </div>

            {/* Designation */}
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter Designation"
              />
            </div>

            {/* Primary Skill */}
            <div>
              <label htmlFor="primarySkill" className="block text-sm font-medium text-gray-700 mb-2">
                Primary Skill <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="primarySkill"
                name="primarySkill"
                value={formData.primarySkill}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter Primary Skill"
              />
            </div>

            {/* Secondary Skill */}
            <div>
              <label htmlFor="secondarySkill" className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Skill
              </label>
              <input
                type="text"
                id="secondarySkill"
                name="secondarySkill"
                value={formData.secondarySkill}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter Secondary Skill"
              />
            </div>

            {/* Skill Rating */}
            <div>
              <label htmlFor="skillRating" className="block text-sm font-medium text-gray-700 mb-2">
                Skill Rating (1-10) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="skillRating"
                name="skillRating"
                min="1"
                max="10"
                value={formData.skillRating}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Rate skills from 1-10"
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                min="0"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter years of experience"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium transition-all duration-200 flex items-center disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Employee
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditEmployeeModal.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    employeeId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    primarySkill: PropTypes.string.isRequired,
    secondarySkill: PropTypes.string.isRequired,
    skillRating: PropTypes.number.isRequired,
    yearsOfExperience: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEmployeeUpdated: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default EditEmployeeModal;