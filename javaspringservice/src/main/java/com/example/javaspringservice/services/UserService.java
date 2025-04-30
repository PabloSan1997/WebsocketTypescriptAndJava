package com.example.javaspringservice.services;

import com.example.javaspringservice.models.dtos.LoginDto;
import com.example.javaspringservice.models.dtos.RegisterDto;
import com.example.javaspringservice.models.dtos.TokenResponse;
import com.example.javaspringservice.models.dtos.UserHeader;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    TokenResponse login(LoginDto loginDto);
    TokenResponse register(RegisterDto registerDto);
    UserHeader viewHeader();
    List<UserHeader> friendsHeader(Pageable pageable);

}
