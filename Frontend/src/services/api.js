import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const employeeAPI = {
  // Get all employees
  getAllEmployees: () => api.get(''),
  
  // Search employee by employeeId
  searchEmployeeById: (employeeId) => api.get(`/search/${employeeId}`),
  
  // Add new employee
  addEmployee: (employee) => api.post('', employee),
  
  // Update employee (only skillRating, department, designation)
  updateEmployee: (id, employeeData) => api.put(`/${id}`, employeeData),
  
  // Delete employee
  deleteEmployee: (id) => api.delete(`/${id}`),
};

export default api;
