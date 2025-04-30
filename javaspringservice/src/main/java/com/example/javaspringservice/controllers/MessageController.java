package com.example.javaspringservice.controllers;

import com.example.javaspringservice.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/message")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping
    public ResponseEntity<?> findMessages(@RequestParam String userfriend){
        return ResponseEntity.ok(messageService.findMessages(userfriend));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id){
        messageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}
