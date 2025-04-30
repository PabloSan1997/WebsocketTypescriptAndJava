package com.example.javaspringservice.websocket.interceptors;


import com.example.javaspringservice.models.dtos.UserSecurity;
import com.example.javaspringservice.services.utils.JwtService;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

public class JwtInterceptor implements HandshakeInterceptor {

    private final JwtService jwtService;

    public JwtInterceptor(JwtService jwtService){
        this.jwtService = jwtService;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        if (request instanceof ServletServerHttpRequest serverRequest) {
            try {
                String token = serverRequest.getServletRequest().getParameter("jwt");
                if(token == null) return false;
                UserSecurity userSecurity = jwtService.valiationToken(token);
                attributes.put("username", userSecurity.getUsername());
                return true;
            } catch (Exception ignore) {
                return false;
            }
        }
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}
