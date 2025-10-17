import { useState } from 'react';
import PropTypes from 'prop-types';
import { employeeAPI } from '../services/api';
import EditEmployeeModal from './EditEmployeeModal';

const SearchResults = ({ employee, onClearSearch, onEmployeeUpdated, setMessage }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        {/* Employee Info Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {employee.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h5 className="font-bold text-gray-900">{employee.name}</h5>
              <p className="text-sm text-gray-600">ID: {employee.employeeId}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors duration-200 flex items-center"
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </>
              )}
            </button>
          </div>
        </div>

        {/* Employee Details */}
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <div className="text-sm font-semibold text-gray-800">
              <a href={`mailto:${employee.email}`} className="text-blue-600 hover:text-blue-800">
                {employee.email}
              </a>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="block text-xs font-medium text-gray-600 mb-1">Department</label>
            <div className="text-sm font-semibold text-gray-800">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {employee.department}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="block text-xs font-medium text-gray-600 mb-1">Designation</label>
            <div className="text-sm font-semibold text-gray-800">{employee.designation}</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="block text-xs font-medium text-gray-600 mb-1">Primary Skill</label>
            <div className="text-sm font-semibold text-gray-800">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {employee.primarySkill}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="block text-xs font-medium text-gray-600 mb-1">Secondary Skill</label>
            <div className="text-sm font-semibold text-gray-800">
              {employee.secondarySkill ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {employee.secondarySkill}
                </span>
              ) : (
                <span className="text-gray-500 italic">Not specified</span>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="block text-xs font-medium text-gray-600 mb-1">Skill Rating</label>
            <div className="text-sm font-semibold text-gray-800">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {employee.skillRating}/10
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="block text-xs font-medium text-gray-600 mb-1">Years of Experience</label>
            <div className="text-sm font-semibold text-gray-800">{employee.yearsOfExperience} years</div>
          </div>
        </div>
      </div>

      {/* Edit Employee Modal */}
      <EditEmployeeModal
        employee={employee}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEmployeeUpdated={onEmployeeUpdated}
        setMessage={setMessage}
      />
    </>
  );
};

SearchResults.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    employeeId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    primarySkill: PropTypes.string.isRequired,
    secondarySkill: PropTypes.string.isRequired,
    skillRating: PropTypes.number.isRequired,
    yearsOfExperience: PropTypes.number.isRequired,
  }).isRequired,
  onClearSearch: PropTypes.func.isRequired,
  onEmployeeUpdated: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default SearchResults;