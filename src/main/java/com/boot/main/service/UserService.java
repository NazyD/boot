package com.boot.main.service;

import com.boot.main.exceptions.UserNotFoundException;
import com.boot.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.boot.main.model.User;

import java.util.List;

// service pro uživatele, sjednocuje repo a jeho volání/získání dat databáze
// a logiku controlleru, zde dochází k ziskavani uprave dat
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // encoder využívám pro encode zadaného hesla na fe a jeho uložení do db v transformovaném stavu
    // při vytváření uživatele a úpravě uživatele
    @Autowired
    private PasswordEncoder passwordEncoder;

    // získání dat
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    // vytvoření dat
    public User createUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    // odstranění dat
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    // upravit data
    public void updateUser(int id, String firstName, String lastName, String username, String password) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("user not found"));

        if (firstName != null && !firstName.trim().isEmpty()) {
            user.setFirstName(firstName);
        }
        if (lastName != null && !lastName.trim().isEmpty()) {
            user.setLastName(lastName);
        }
        if (username != null && !username.trim().isEmpty()) {
            user.setUsername(username);
        }
        if (password != null && !password.trim().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(password);
            user.setPassword(encodedPassword);
        }
        userRepository.save(user);
    }
}
