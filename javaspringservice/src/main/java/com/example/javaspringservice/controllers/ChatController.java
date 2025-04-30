package com.example.javaspringservice.controllers;

import com.example.javaspringservice.models.dtos.ChatSocketDto;
import com.example.javaspringservice.models.dtos.MessageDto;
import com.example.javaspringservice.models.dtos.SaveMessageDto;
import com.example.javaspringservice.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private MessageService messageService;

    @MessageMapping("/chat")
    public void chatgeneration(@Payload ChatSocketDto chatSocketDto, Principal principal){
        String username = principal.getName();
        String userfriend = chatSocketDto.getUserfriend();
        SaveMessageDto saveMessageDto = new SaveMessageDto(chatSocketDto.getMessage());
        MessageDto messageDto = messageService.saveMessage(username, userfriend, saveMessageDto);

        simpMessagingTemplate.convertAndSendToUser(username, "/user/chat/"+userfriend, messageDto);
        simpMessagingTemplate.convertAndSendToUser(userfriend, "/user/chat/"+username, messageDto);
    }
}
