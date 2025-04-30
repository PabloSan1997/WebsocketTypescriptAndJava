package com.example.javaspringservice.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "message_entity")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 500, nullable = false)
    private String message;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "id_user_send")
    @JsonIgnore
    private Users usersend;

    @ManyToOne
    @JoinColumn(name = "id_user_recive")
    @JsonIgnore
    private Users userrecive;

    @PrePersist
    public void prepersist(){
        createdAt = LocalDateTime.now();
    }
}
