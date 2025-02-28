package com.boot.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.boot.main.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    // pouze jedna custom metoda využivající se v security i get metodě, ostatní využívané jsou výchozí z jperepa
    Optional<User> findByUsername(String username);

}
