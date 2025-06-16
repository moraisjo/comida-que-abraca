package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.CollaboratorRole;

public record OngCollaboratorResponseDTO(
        String name,
        String email,
        String phone,
        String address,
        CollaboratorRole role
) {}
