package com.example.javaspringservice.security.filters;

import com.example.javaspringservice.models.dtos.UserSecurity;
import com.example.javaspringservice.services.utils.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JwtValidationFilter extends BasicAuthenticationFilter {

    private final JwtService jwtService;

    public JwtValidationFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
        super(authenticationManager);
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        String token = header.replace("Bearer ", "");
        try{
            UserSecurity userSecurity = jwtService.valiationToken(token);
            Authentication authenticationToken = new UsernamePasswordAuthenticationToken(
                    userSecurity.getUsername(), null, userSecurity.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }catch (Exception ignored){}
        chain.doFilter(request, response);
    }
}
