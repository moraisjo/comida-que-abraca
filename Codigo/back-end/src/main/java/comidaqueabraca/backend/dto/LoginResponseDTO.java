package comidaqueabraca.backend.dto;

import java.time.LocalDateTime;

public record LoginResponseDTO(String token, Integer userId, LocalDateTime lgpdConsentDate) {}