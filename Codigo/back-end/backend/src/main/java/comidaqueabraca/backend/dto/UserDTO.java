package comidaqueabraca.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record UserDTO(
        @NotBlank String name,

        @NotBlank String email,

        String phone,

        Integer addressId
) {}