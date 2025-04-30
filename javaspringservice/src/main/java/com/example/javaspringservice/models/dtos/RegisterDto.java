package com.example.javaspringservice.models.dtos;

import lombok.Data;

@Data
public class RegisterDto {
    private String username;
    private String password;
    private String nickname;
    private String urlImage;
}
