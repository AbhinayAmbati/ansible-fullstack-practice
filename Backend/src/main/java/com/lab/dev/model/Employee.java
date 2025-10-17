package com.lab.dev.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employee")
public class Employee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "employee_id", length = 50)
    private String employeeId;
    
    @Column(name = "name", length = 100)
    private String name;
    
    @Column(name = "department", length = 100)
    private String department;
    
    @Column(name = "designation", length = 100)
    private String designation;
    
    @Column(name = "primary_skill", length = 100)
    private String primarySkill;
    
    @Column(name = "secondary_skill", length = 100)
    private String secondarySkill;
    
    @Column(name = "skill_rating")
    private int skillRating;
    
    @Column(name = "years_of_experience")
    private int yearsOfExperience;
    
    @Column(name = "email", length = 100)
    private String email;

    // Default constructor
    public Employee() {}

    // Constructor with all fields
    public Employee(Long id, String employeeId, String name, String department, String designation, 
                   String primarySkill, String secondarySkill, int skillRating, int yearsOfExperience, String email) {
        this.id = id;
        this.employeeId = employeeId;
        this.name = name;
        this.department = department;
        this.designation = designation;
        this.primarySkill = primarySkill;
        this.secondarySkill = secondarySkill;
        this.skillRating = skillRating;
        this.yearsOfExperience = yearsOfExperience;
        this.email = email;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getPrimarySkill() {
        return primarySkill;
    }

    public void setPrimarySkill(String primarySkill) {
        this.primarySkill = primarySkill;
    }

    public String getSecondarySkill() {
        return secondarySkill;
    }

    public void setSecondarySkill(String secondarySkill) {
        this.secondarySkill = secondarySkill;
    }

    public int getSkillRating() {
        return skillRating;
    }

    public void setSkillRating(int skillRating) {
        this.skillRating = skillRating;
    }

    public int getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(int yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
