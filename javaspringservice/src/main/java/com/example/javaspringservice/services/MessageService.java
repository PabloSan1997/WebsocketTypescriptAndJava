package com.example.javaspringservice.services;

import com.example.javaspringservice.models.dtos.MessageDto;
import com.example.javaspringservice.models.dtos.SaveMessageDto;

import java.util.List;

public interface MessageService {
    List<MessageDto> findMessages(String frienduser);
    void deleteMessage(Long id);
    MessageDto saveMessage(String username ,String userfriend,SaveMessageDto newmessage);
}
