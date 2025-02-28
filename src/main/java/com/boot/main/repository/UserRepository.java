package com.boot.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.boot.main.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

}
