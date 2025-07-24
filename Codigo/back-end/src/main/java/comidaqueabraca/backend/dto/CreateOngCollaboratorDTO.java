package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.CollaboratorRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateOngCollaboratorDTO(
        @NotBlank String name,
        @Email @NotBlank String email,
        @NotBlank String password,
        String phone,
        String address,
        CollaboratorRole role
) {}
