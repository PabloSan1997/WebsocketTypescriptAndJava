package com.example.javaspringservice.models.dtos;


import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Setter
public class UserSecurity implements UserDetails {

    private String useranme;
    private String password;
    @Getter
    private String nickname;
    private Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return useranme;
    }
    //rolename -> authority
    //ROLE_rolename -> role
    public void setAuthorityAsRole(String rolename){
        authorities = List.of(new SimpleGrantedAuthority("ROLE_"+rolename));
    }
}
