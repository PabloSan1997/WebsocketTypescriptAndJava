package com.example.javaspringservice.controllers;

import com.example.javaspringservice.models.dtos.LoginDto;
import com.example.javaspringservice.models.dtos.RegisterDto;
import com.example.javaspringservice.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> signup(@RequestBody RegisterDto registerDto){
        return ResponseEntity.status(201).body(userService.register(registerDto));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(userService.login(loginDto));
    }
    @GetMapping("/findfriendheader")
    public ResponseEntity<?> findfriendheader(Pageable pageable){
        return ResponseEntity.ok(userService.friendsHeader(pageable));
    }
    @GetMapping("/viewheader")
    public ResponseEntity<?> viewUserHeader(){
        return ResponseEntity.ok(userService.viewHeader());
    }
}
