# SkillMatrix - Employee Skill Tracker

A full-stack web application for managing employee skill data built with React (frontend), Spring Boot (backend), and MySQL (database).

## Features

- ✅ Add new employee with 9 fields (Employee ID, Name, Department, Designation, Primary Skill, Secondary Skill, Skill Rating, Years of Experience, Email)
- ✅ View all employees in a responsive table
- ✅ Edit employee details (Department, Designation, Skill Rating) with inline editing
- ✅ Real-time success/error messages
- ✅ Modern UI with TailwindCSS
- ✅ RESTful API with Spring Boot
- ✅ MySQL database persistence

## Tech Stack

### Backend
- **Spring Boot 3.5.6** with Java 21
- **Spring Data JPA** for database operations
- **MySQL** for data persistence
- **Lombok** for reducing boilerplate code
- **Maven** for dependency management

### Frontend
- **React 18** with Vite
- **TailwindCSS** for styling
- **Axios** for API calls
- **Modern responsive design**

## Project Structure

```
DevOps-Full-Stack/
├── Backend/                    # Spring Boot application
│   ├── src/main/java/com/lab/dev/
│   │   ├── model/Employee.java
│   │   ├── repository/EmployeeRepository.java
│   │   ├── controller/EmployeeController.java
│   │   └── BackendApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── Frontend/                   # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.jsx
│   │   │   └── EmployeeTable.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Java 21 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Database Setup
1. Install and start MySQL server
2. Create a database named `skillmatrix_db`:
   ```sql
   CREATE DATABASE skillmatrix_db;
   ```
3. Update MySQL credentials in `Backend/src/main/resources/application.properties` if needed

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies and run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
3. The backend will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The frontend will start on `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| POST | `/employees` | Add new employee |
| PUT | `/employees/{id}` | Update employee (department, designation, skill rating) |

## Database Schema

```sql
CREATE TABLE employee (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(50),
  name VARCHAR(100),
  department VARCHAR(100),
  designation VARCHAR(100),
  primary_skill VARCHAR(100),
  secondary_skill VARCHAR(100),
  skill_rating INT,
  years_of_experience INT,
  email VARCHAR(100)
);
```

## Usage

1. **Add Employee**: Fill out the form with all 9 required fields and click "Add Employee"
2. **View Employees**: All employees are displayed in the table below the form
3. **Edit Employee**: Click "Edit" on any row to modify Department, Designation, or Skill Rating
4. **Save Changes**: Click "Save" to confirm changes or "Cancel" to discard

## Features Implemented

- ✅ Single page application with form and table
- ✅ Single REST controller `/employees`
- ✅ MySQL database persistence
- ✅ CORS configuration for React frontend
- ✅ Responsive design with TailwindCSS
- ✅ Input validation and error handling
- ✅ Success/error message display
- ✅ Inline editing functionality
- ✅ Auto-refresh after operations

## Development Notes

- The application uses Spring Boot's auto-configuration
- Database tables are auto-created using JPA annotations
- Frontend uses modern React hooks (useState, useEffect)
- API calls are centralized in the services layer
- TailwindCSS provides utility-first styling
- Cross-origin requests are enabled for development

## Troubleshooting

1. **Backend not starting**: Check MySQL connection and ensure database exists
2. **Frontend API errors**: Ensure backend is running on port 8080
3. **CORS issues**: Verify CORS configuration in EmployeeController
4. **Database connection**: Check MySQL credentials in application.properties
