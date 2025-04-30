package com.example.javaspringservice.repositories;

import com.example.javaspringservice.models.entities.Users;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<Users, Long> {
    Optional<Users> findByUsername(String username);

    @Query("select u from Users u where u.username <> ?1")
    List<Users> findAllExceptMain(String username ,Pageable pageable);
}
