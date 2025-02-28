package com.boot.main.dto;

import jakarta.validation.constraints.Size;

// dto pro transformaci vstupních hodnot v metodách controlleru
public class UserUpdateDTO {

    @Size(min = 2, max = 50, message = "first name must be between 2 and 50 characters")
    private String firstName;

    @Size(min = 2, max = 50, message = "last name must be between 2 and 50 characters")
    private String lastName;

    @Size(min = 3, max = 30, message = "username must be between 3 and 30 characters")
    private String username;

    @Size(min = 3, max = 130, message = "last name must be between 3 and 130 characters")
    private String password;

    public UserUpdateDTO() {
    }

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
