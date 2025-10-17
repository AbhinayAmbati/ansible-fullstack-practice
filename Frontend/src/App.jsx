import { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import SearchResults from './components/SearchResults';
import { employeeAPI } from './services/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showAllEmployees, setShowAllEmployees] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setMessage({ type: 'error', text: 'Failed to load employees. Please check if the backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleEmployeeAdded = () => {
    fetchEmployees();
    setShowForm(false); // Hide form after adding employee
  };

  const handleEmployeeUpdated = () => {
    fetchEmployees();
  };

  const handleSearch = async (e) => {
    // Handle both Enter key and direct function call
    if ((e && e.key === 'Enter' && searchId.trim()) || (!e && searchId.trim())) {
      setIsSearching(true);
      try {
        const response = await employeeAPI.searchEmployeeById(searchId.trim());
        setSearchResult(response.data);
        setShowAllEmployees(false);
        setMessage({ type: 'success', text: `Employee found: ${response.data.name}` });
      } catch (error) {
        console.error('Error searching employee:', error);
        setSearchResult(null);
        setShowAllEmployees(false);
        setMessage({ type: 'error', text: `Employee with ID "${searchId}" not found.` });
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleClearSearch = () => {
    setSearchId('');
    setSearchResult(null);
    setShowAllEmployees(true);
    setMessage(null);
  };

  const displayedEmployees = showAllEmployees ? employees : (searchResult ? [searchResult] : []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-10">
          <div className="flex items-center gap-2 justify-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
            SkillMatrix
          </h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">Employee Skill Tracker</p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Efficiently manage and track employee skills, departments, and professional information with our comprehensive tracking system
          </p>
        </header>

        {/* Search and Actions Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Employee
            </h3>
            <div className="flex items-center space-x-3">
              {!showAllEmployees && (
                <button
                  onClick={handleClearSearch}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Show All
                </button>
              )}
              <button
                onClick={() => setShowForm(!showForm)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  showForm 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {showForm ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Employee
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Employee ID to search..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={handleSearch}
                className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              onClick={handleSearchClick}
              disabled={!searchId.trim() || isSearching}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
            >
              {isSearching ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </>
              )}
            </button>
            {searchResult && (
              <button
                onClick={handleClearSearch}
                className="px-4 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            )}
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            💡 Tip: Type an Employee ID and press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Enter</kbd> or click <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Search</kbd> button
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700' 
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {message.type === 'success' ? (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            </div>
          </div>
        )}

        {/* Employee Form - Conditional Rendering */}
        {showForm && (
          <div className="transform transition-all duration-300 ease-in-out">
            <EmployeeForm 
              onEmployeeAdded={handleEmployeeAdded}
              setMessage={setMessage}
            />
          </div>
        )}

        {/* Search Results or Employee Table */}
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">Loading employees...</p>
          </div>
        ) : searchResult ? (
          <SearchResults 
            employee={searchResult}
            onClearSearch={handleClearSearch}
            onEmployeeUpdated={handleEmployeeUpdated}
            setMessage={setMessage}
          />
        ) : (
          <EmployeeTable 
            employees={displayedEmployees}
            onEmployeeUpdated={handleEmployeeUpdated}
            setMessage={setMessage}
            onAddEmployeeClick={() => setShowForm(true)}
          />
        )}
      </div>
    </div>
  );
}

export default App
