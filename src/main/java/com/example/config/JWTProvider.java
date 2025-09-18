package com.example.config;

import java.util.Date;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTProvider {
    SecretKey key = Keys.hmacShaKeyFor(JWTConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth) {
        String authorities = auth.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));
        return Jwts.builder()
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 846000000))
            .claim("email", auth.getName())
            .claim("authorities", authorities)
            .signWith(key)
            .compact();
    }

    public String getEmailFromToken(String jwt) {
        Claims claims = getClaims(jwt);
        return String.valueOf(claims.get("email"));
    }

    private Claims getClaims(String jwt) {
        if (jwt.startsWith("Bearer ")) jwt = jwt.substring(7);
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }
}
