package com.boot.main.controller;

import com.boot.main.dto.UserUpdateDTO;
import com.boot.main.exceptions.UserNotFoundException;
import com.boot.main.model.User;
import com.boot.main.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // získání dat
    @GetMapping("/")
    @PreAuthorize("isAuthenticated()")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/id/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = userService.getUserById(id);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/username/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }

    // vytvoření dat
    @PostMapping("/")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User newUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    // odstranění dat
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        User user = userService.getUserById(id);
        if(user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        } else {
            userService.deleteUser(id);
            return ResponseEntity.ok("user deleted");
        }
    }

    // úprava dat
    @PatchMapping("/{id}")
    public ResponseEntity<String> updateUser(
            @PathVariable int id,
            @Valid @RequestBody UserUpdateDTO updatedUser){

        try {
            userService.updateUser(id, updatedUser.getFirstName(), updatedUser.getLastName(), updatedUser.getUsername(), updatedUser.getPassword());
            return ResponseEntity.ok("user updated");
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
    }

}
