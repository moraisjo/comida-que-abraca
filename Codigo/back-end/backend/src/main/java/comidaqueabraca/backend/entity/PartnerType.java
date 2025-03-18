package comidaqueabraca.backend.entity;

public enum PartnerType {
    INDIVIDUAL("Pessoa Física"),
    COMPANY("Empresa"),
    NON_GOVERNMENTAL_ORGANIZATION("Organização não-governamental"),
    GOVERNMENT("Órgão Governamental");

    private final String description;

    PartnerType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
