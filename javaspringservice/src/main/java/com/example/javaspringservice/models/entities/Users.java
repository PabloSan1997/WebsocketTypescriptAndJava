package com.example.javaspringservice.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, length = 60)
    private String username;
    @Column(length = 60)
    private String nickname;
    @Column(length = 600, name = "url_image")
    private String urlImage;
    @Column(length = 600)
    @JsonIgnore
    private String password;
    @Column(length = 10)
    private String role;

    @OneToMany(mappedBy = "usersend", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Message>  messagessend;
    @OneToMany(mappedBy = "userrecive", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Message> messagesrecive;
}
