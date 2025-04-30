package com.example.javaspringservice.services.implementations;

import com.example.javaspringservice.exceptions.UserNoExistException;
import com.example.javaspringservice.models.dtos.*;
import com.example.javaspringservice.models.entities.Users;
import com.example.javaspringservice.repositories.UserRepository;
import com.example.javaspringservice.services.UserService;
import com.example.javaspringservice.services.utils.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;

    @Override
    @Transactional
    public TokenResponse login(LoginDto loginDto) {
        String username = loginDto.getUsername();
        String password = loginDto.getPassword();
        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        try {
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            UserSecurity userSecurity = (UserSecurity) authentication.getPrincipal();
            String token = jwtService.generateToken(userSecurity);
            return TokenResponse.builder().useranme(username).jwt(token).build();
        } catch (Exception ignoreexception) {
            throw new UserNoExistException("Usuario o contraseña incorrectos");
        }
    }

    @Override
    @Transactional
    public TokenResponse register(RegisterDto registerDto) {
        String username = registerDto.getUsername();
        if (userRepository.findByUsername(username).isPresent()) {
            throw new UserNoExistException("Username ocupado");
        }
        String password = passwordEncoder.encode(registerDto.getPassword());

        Users user = Users.builder()
                .role("USER")
                .urlImage(registerDto.getUrlImage())
                .nickname(registerDto.getNickname())
                .username(username)
                .password(password)
                .messagesrecive(new ArrayList<>())
                .messagessend(new ArrayList<>()).build();

        Users newuser = userRepository.save(user);
        return login(
                LoginDto.builder()
                        .password(registerDto.getPassword())
                        .username(newuser.getUsername()).build()
        );
    }

    @Override
    @Transactional
    public UserHeader viewHeader() {
        Users user = getUserAuthentication();
        return UserHeader.builder()
                .nickname(user.getNickname()).username(user.getUsername())
                .urlImage(user.getUrlImage()).build();

    }

    @Override
    @Transactional
    public List<UserHeader> friendsHeader(Pageable pageable) {
        Users user = getUserAuthentication();
        List<Users> users = userRepository.findAllExceptMain(user.getUsername(), pageable);
        return users.stream().map(p ->
                UserHeader.builder().urlImage(p.getUrlImage())
                        .username(p.getUsername())
                        .nickname(p.getNickname()).build()
        ).toList();
    }

    private Users getUserAuthentication(){
       String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
       return userRepository.findByUsername(username)
               .orElseThrow(()-> new RuntimeException("Usuario no existe"));
    }
}
