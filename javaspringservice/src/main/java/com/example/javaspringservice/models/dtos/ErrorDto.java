package com.example.javaspringservice.models.dtos;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ErrorDto {
    private String error;
    private Integer statusCode;
    private String message;

    public ErrorDto(HttpStatus status, String message){
        this.error = status.getReasonPhrase();
        this.statusCode = status.value();
        this.message = message;
    }
}
