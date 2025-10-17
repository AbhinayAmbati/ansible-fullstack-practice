import { useState } from 'react';
import { employeeAPI } from '../services/api';

const SearchResults = ({ employee, onClearSearch, onEmployeeUpdated, setMessage }) => {
  const [editingField, setEditingField] = useState(null);
  const [editData, setEditData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (field, value) => {
    setEditingField(field);
    setEditData({ [field]: value });
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      await employeeAPI.updateEmployee(employee.id, editData);
      setMessage({ type: 'success', text: 'Employee updated successfully!' });
      setEditingField(null);
      setEditData({});
      onEmployeeUpdated();
    } catch (error) {
      console.error('Error updating employee:', error);
      setMessage({ type: 'error', text: 'Failed to update employee. Please try again.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditData({});
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete employee "${employee.name}"? This action cannot be undone.`)) {
      setIsDeleting(true);
      try {
        await employeeAPI.deleteEmployee(employee.id);
        setMessage({ type: 'success', text: `Employee "${employee.name}" deleted successfully!` });
        onClearSearch(); // Clear search and return to all employees
        onEmployeeUpdated();
      } catch (error) {
        console.error('Error deleting employee:', error);
        setMessage({ type: 'error', text: 'Failed to delete employee. Please try again.' });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const renderField = (label, field, value, editable = false) => {
    const isEditing = editingField === field;
    
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
        {editable && isEditing ? (
          <div className="flex items-center space-x-2">
            {field === 'skillRating' ? (
              <input
                type="number"
                min="1"
                max="10"
                value={editData[field] || ''}
                onChange={(e) => setEditData({ [field]: parseInt(e.target.value) || 0 })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : field === 'yearsOfExperience' ? (
              <input
                type="number"
                min="0"
                value={editData[field] || ''}
                onChange={(e) => setEditData({ [field]: parseInt(e.target.value) || 0 })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : field === 'email' ? (
              <input
                type="email"
                value={editData[field] || ''}
                onChange={(e) => setEditData({ [field]: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <input
                type="text"
                value={editData[field] || ''}
                onChange={(e) => setEditData({ [field]: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-800">
              {field === 'skillRating' ? `${value}/10` : 
               field === 'yearsOfExperience' ? `${value} years` : value}
            </span>
            {editable && (
              <button
                onClick={() => handleEdit(field, value)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-green-100 p-3 rounded-lg mr-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Employee Details</h2>
            <p className="text-gray-600 mt-1">Complete information for {employee.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onClearSearch}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Search
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Employee
              </>
            )}
          </button>
        </div>
      </div>

      {/* Employee Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderField('Employee ID', 'employeeId', employee.employeeId, true)}
        {renderField('Full Name', 'name', employee.name, true)}
        {renderField('Department', 'department', employee.department, true)}
        {renderField('Designation', 'designation', employee.designation, true)}
        {renderField('Primary Skill', 'primarySkill', employee.primarySkill, true)}
        {renderField('Secondary Skill', 'secondarySkill', employee.secondarySkill, true)}
        {renderField('Skill Rating', 'skillRating', employee.skillRating, true)}
        {renderField('Years of Experience', 'yearsOfExperience', employee.yearsOfExperience, true)}
        {renderField('Email Address', 'email', employee.email, true)}
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-blue-800 font-medium">
            You can edit any employee field by clicking the "Edit" button next to each field.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
