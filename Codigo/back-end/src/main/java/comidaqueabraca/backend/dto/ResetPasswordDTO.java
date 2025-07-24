package comidaqueabraca.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ResetPasswordDTO (
    @Email @NotBlank String email,
    @NotBlank String newPassword
) {}
