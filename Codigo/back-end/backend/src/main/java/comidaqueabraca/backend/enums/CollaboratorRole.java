package comidaqueabraca.backend.enums;

import lombok.Getter;

@Getter
public enum CollaboratorRole {
    ADMIN("Administrador"),
    COLLABORATOR("Colaborador");

    private final String description;

    CollaboratorRole(String description) {
        this.description = description;
    }
}
