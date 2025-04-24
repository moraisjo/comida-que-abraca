package comidaqueabraca.backend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import comidaqueabraca.backend.entity.UserEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(UserEntity user) {
        try {
            var algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("API comidaqueabraca.org")
                    .withSubject(user.getEmail())
                    .withExpiresAt(getExpirationDateTime())
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error generating JTW token", e);
        }
    }

    private Instant getExpirationDateTime() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
