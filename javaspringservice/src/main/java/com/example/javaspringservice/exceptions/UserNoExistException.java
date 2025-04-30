package com.example.javaspringservice.exceptions;

public class UserNoExistException extends RuntimeException{
    public UserNoExistException() {
    }

    public UserNoExistException(String message) {
        super(message);
    }
}
