package com.lab.dev.controller;

import com.lab.dev.model.Employee;
import com.lab.dev.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/search/{employeeId}")
    public ResponseEntity<Employee> getEmployeeByEmployeeId(@PathVariable String employeeId) {
        List<Employee> employees = employeeRepository.findAll();
        Optional<Employee> employee = employees.stream()
                .filter(emp -> emp.getEmployeeId().equals(employeeId))
                .findFirst();
        
        if (employee.isPresent()) {
            return ResponseEntity.ok(employee.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            
            // Update all fields (except id which is auto-generated)
            if (employeeDetails.getEmployeeId() != null && !employeeDetails.getEmployeeId().isEmpty()) {
                employee.setEmployeeId(employeeDetails.getEmployeeId());
            }
            if (employeeDetails.getName() != null && !employeeDetails.getName().isEmpty()) {
                employee.setName(employeeDetails.getName());
            }
            if (employeeDetails.getDepartment() != null && !employeeDetails.getDepartment().isEmpty()) {
                employee.setDepartment(employeeDetails.getDepartment());
            }
            if (employeeDetails.getDesignation() != null && !employeeDetails.getDesignation().isEmpty()) {
                employee.setDesignation(employeeDetails.getDesignation());
            }
            if (employeeDetails.getPrimarySkill() != null && !employeeDetails.getPrimarySkill().isEmpty()) {
                employee.setPrimarySkill(employeeDetails.getPrimarySkill());
            }
            if (employeeDetails.getSecondarySkill() != null && !employeeDetails.getSecondarySkill().isEmpty()) {
                employee.setSecondarySkill(employeeDetails.getSecondarySkill());
            }
            if (employeeDetails.getSkillRating() != 0) {
                employee.setSkillRating(employeeDetails.getSkillRating());
            }
            if (employeeDetails.getYearsOfExperience() != 0) {
                employee.setYearsOfExperience(employeeDetails.getYearsOfExperience());
            }
            if (employeeDetails.getEmail() != null && !employeeDetails.getEmail().isEmpty()) {
                employee.setEmail(employeeDetails.getEmail());
            }
            
            Employee updatedEmployee = employeeRepository.save(employee);
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        
        if (optionalEmployee.isPresent()) {
            employeeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
