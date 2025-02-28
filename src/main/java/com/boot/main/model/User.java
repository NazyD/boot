package com.boot.main.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "user", schema = "security")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(min = 2, max = 50, message = "first name must be between 2 and 50 characters")
    @Column(name = "first_name", nullable = true)
    private String firstName;

    @NotBlank(message = "last name cannot be empty")
    @Size(min = 2, max = 50, message = "last name must be between 2 and 50 characters")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotBlank(message = "username cannot be empty")
    @Size(min = 3, max = 30, message = "username must be between 3 and 30 characters")
    @Column(name = "username", nullable = false)
    private String username;

    @NotBlank(message = "password cannot be empty")
    @Size(min = 3, max = 130, message = "password must be between 3 and 130 characters")
    @Column(name = "password", nullable = false)
    private String password;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public String getLastName(){
        return lastName;
    }
    public void setLastName(String lastName){
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
