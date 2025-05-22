package comidaqueabraca.backend.dto;

import java.time.LocalDateTime;

public record TokenDTO(String token, Integer userId, LocalDateTime lgpdConsentDate) {
}
