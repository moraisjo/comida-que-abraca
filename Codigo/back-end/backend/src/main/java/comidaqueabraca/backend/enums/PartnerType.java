package comidaqueabraca.backend.enums;

public enum PartnerType {
    PESSOA_FISICA("Pessoa Física"),
    EMPRESA("Empresa"),
    ONG("Organização não-governamental"),
    GOVERNO("Órgão Governamental");

    private final String description;

    // Construtor privado
    PartnerType(String description) {
        this.description = description;
    }

    // Getter para obter a descrição
    public String getDescription() {
        return description;
    }
}
