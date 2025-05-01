package com.example.javaspringservice.services.implementations;

import com.example.javaspringservice.exceptions.UserNoExistException;
import com.example.javaspringservice.models.dtos.MessageDto;
import com.example.javaspringservice.models.dtos.MessageIdDto;
import com.example.javaspringservice.models.dtos.SaveMessageDto;
import com.example.javaspringservice.models.dtos.UserHeader;
import com.example.javaspringservice.models.entities.Message;
import com.example.javaspringservice.models.entities.Users;
import com.example.javaspringservice.repositories.MessageRepository;
import com.example.javaspringservice.repositories.UserRepository;
import com.example.javaspringservice.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MessageServiceImp implements MessageService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private Users getUserAuthentication(){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(username)
                .orElseThrow(()-> new RuntimeException("Usuario no existe"));
    }
    private Users findUser(String username){
        return userRepository.findByUsername(username)
                .orElseThrow(()-> new UserNoExistException("User no encontrado"));
    }
    private MessageDto generateMessageDto(Message message){
        Users user = message.getUsersend();
        UserHeader userHeader = UserHeader.builder()
                .urlImage(user.getUrlImage())
                .nickname(user.getNickname())
                .username(user.getUsername()).build();
        return MessageDto.builder()
                .message(message.getMessage())
                .id(message.getId())
                .createdAt(message.getCreatedAt())
                .user(userHeader).build();
    }

    @Override
    @Transactional
    public List<MessageDto> findMessages(String frienduser) {
        Users user = getUserAuthentication();
        Users frienduserEntity = findUser(frienduser);
        List<Message> messages = messageRepository.findChatMessages(
                user.getUsername(), frienduserEntity.getUsername()
        );
        return messages.stream()
                .map(this::generateMessageDto).toList();
    }

    @Override
    @Transactional
    public void deleteMessage(Long id) {
        Users user = getUserAuthentication();
        messageRepository.findByUsernameAndId(user.getUsername(), id)
                .ifPresent(m -> {
                    var idmessage = new MessageIdDto(m.getId());
                    String username = m.getUsersend().getUsername();
                    String userfriend = m.getUserrecive().getUsername();
                    messageRepository.deleteById(m.getId());
                    simpMessagingTemplate.convertAndSendToUser(username, "/chat/deletemessage", idmessage);
                    simpMessagingTemplate.convertAndSendToUser(userfriend, "/chat/deletemessage", idmessage);
                });
    }


    @Override
    @Transactional
    public MessageDto saveMessage(String username, String userfriend, SaveMessageDto newmessage) {
        Users usersend = findUser(username);
        Users userrecive = findUser(userfriend);
        Message message = Message.builder()
                .usersend(usersend)
                .userrecive(userrecive)
                .message(newmessage.getMessage())
                .build();
        Message savemessage = messageRepository.save(message);
        return generateMessageDto(savemessage);
    }
}
