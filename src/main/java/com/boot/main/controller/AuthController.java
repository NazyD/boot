package com.boot.main.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(Authentication authentication) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("username", authentication.getName());
        return ResponseEntity.ok(response);
    }
}