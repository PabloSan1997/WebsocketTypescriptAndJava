package com.example.javaspringservice.services.utils;

import com.example.javaspringservice.models.dtos.UserSecurity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class JwtService {

    @Value("${jwt.secret.key}")
    private String secretkey;

    private SecretKey getKey(){
        byte[] key = Decoders.BASE64URL.decode(secretkey);
        return Keys.hmacShaKeyFor(key);
    }

    public String generateToken(UserSecurity userSecurity) throws Exception{
       String username = userSecurity.getUsername();
       String nickname = userSecurity.getNickname();
        List<String> authoritiesname = userSecurity.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();
        Claims claims = Jwts.claims()
                .add("username", username)
                .add("nickname",nickname)
                .add("authorities", authoritiesname)
                .build();

        return Jwts.builder().signWith(getKey()).claims(claims)
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+1000*60*60*24))
                .compact();
    }

    public UserSecurity valiationToken(String token) throws Exception{
        Claims claims = Jwts.parser().verifyWith(getKey()).build()
                .parseSignedClaims(token).getPayload();
        String username = claims.getSubject();
        String nickname = (String) claims.get("nickname");
        List<?> listauthorities = claims.get("authorities", List.class);
        List<String> listnames = listauthorities.stream()
                .filter(Objects::nonNull)
                .map(Object::toString)
                .toList();
        UserSecurity userSecurity = new UserSecurity();
        userSecurity.setUseranme(username);
        userSecurity.setNickname(nickname);
        userSecurity.setAuthorities(
                listnames.stream().map(SimpleGrantedAuthority::new).toList()
        );
        return userSecurity;
    }
}
