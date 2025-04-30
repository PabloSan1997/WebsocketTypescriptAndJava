package com.example.javaspringservice.services.implementations;

import com.example.javaspringservice.exceptions.UserNoExistException;
import com.example.javaspringservice.models.dtos.UserSecurity;
import com.example.javaspringservice.models.entities.Users;
import com.example.javaspringservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByUsername(username)
                .orElseThrow(UserNoExistException::new);
        UserSecurity userSecurity = new UserSecurity();
        userSecurity.setPassword(user.getPassword());
        userSecurity.setNickname(user.getNickname());
        userSecurity.setAuthorityAsRole(user.getRole());
        userSecurity.setUseranme(username);

        return userSecurity;
    }
}
