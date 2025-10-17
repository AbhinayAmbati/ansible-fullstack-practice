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
      console.log('Starting search for employee ID:', searchId.trim());
      setIsSearching(true);
      try {
        const response = await employeeAPI.searchEmployeeById(searchId.trim());
        console.log('Search response:', response.data);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
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

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                SkillMatrix
              </h1>
              <p className="text-sm text-gray-600">Employee Skill Tracker</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
              showForm 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg'
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
      </header>

      {/* Message Display */}
      {message && (
        <div className={`mx-6 mt-4 p-4 rounded-lg ${
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

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - 70% - Employee List */}
        <div className="w-[70%] overflow-y-auto p-6">
          {showForm ? (
            <EmployeeForm 
              onEmployeeAdded={handleEmployeeAdded}
              setMessage={setMessage}
            />
          ) : loading ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600">Loading employees...</p>
            </div>
          ) : (
            <EmployeeTable 
              employees={showAllEmployees ? employees : (searchResult ? [searchResult] : [])}
              onEmployeeUpdated={handleEmployeeUpdated}
              setMessage={setMessage}
              onAddEmployeeClick={() => setShowForm(true)}
            />
          )}
        </div>

        {/* Right Side - 30% - Search Panel */}
        <div className="w-[30%] bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <div className="sticky top-0 bg-white pb-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Employee
            </h3>
            
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Employee ID..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <button
                onClick={handleSearchClick}
                disabled={!searchId.trim() || isSearching}
                className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
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
                  className="w-full px-4 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Search
                </button>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-3">
              💡 Press Enter or click Search
            </p>
          </div>

          {/* Search Results Display */}
          {searchResult && (
            <div className="mt-6 space-y-4">
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Result</h4>
                <SearchResults 
                  employee={searchResult}
                  onClearSearch={handleClearSearch}
                  onEmployeeUpdated={handleEmployeeUpdated}
                  setMessage={setMessage}
                />
              </div>
            </div>
          )}

          {!searchResult && !isSearching && searchId && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600">No results. Try searching for an employee.</p>
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
}

export default App;
