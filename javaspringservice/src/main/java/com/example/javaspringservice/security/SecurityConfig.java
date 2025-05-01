package com.example.javaspringservice.security;

import com.example.javaspringservice.security.filters.JwtValidationFilter;
import com.example.javaspringservice.services.utils.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Value("${server.port}")
    private Integer port;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, JwtService jwtService) throws Exception {
        http.csrf(c->c.disable())
                .authorizeHttpRequests(a -> a
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/user/viewheader",
                                "/api/user/findfriendheader",
                                "/api/message"

                        ).hasRole("USER")
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/message/{id}"
                        ).hasRole("USER")
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/user/login",
                                "/api/user/register"
                        ).permitAll()
                        .requestMatchers(
                                "/chatservice",
                                "/chatservice/**",
                                "/", "/index.html", "/assets", "/assets/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .cors(c -> c.configurationSource(corsConfigurationSource()))
                .addFilter(new JwtValidationFilter(authenticationManager(), jwtService))
                .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }



    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedMethods(List.of("GET", "POST", "DELETE"));
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    CommandLineRunner commandLineRunner(){
        return args -> {
            System.out.println("\n\nPort: "+port+"\n\n");
        };
    }
}
