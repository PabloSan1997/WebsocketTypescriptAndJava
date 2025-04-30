package com.example.javaspringservice.repositories;

import com.example.javaspringservice.models.entities.Message;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends CrudRepository<Message, Long> {

    @Query("select m from Message m where (m.usersend.username=?1 and m.userrecive.username=?2) or (m.usersend.username=?2 and m.userrecive.username=?1) order by m.createdAt")
    List<Message> findChatMessages(String username, String userfriend);

    @Query("select m from Message m where m.usersend.username = ?1 and m.id = ?2")
    Optional<Message> findByUsernameAndId(String username, Long id);
}
