package comidaqueabraca.backend.enums;

import lombok.Getter;

@Getter
public enum LegalEntityType {
    ONG("ONG"),
    COMPANY("Empresa"),
    INDIVIDUAL("Pessoa-física"),
    GOVERNMENT("Governo");

    private final String description;

    LegalEntityType(String description) {
        this.description = description;
    }
}
