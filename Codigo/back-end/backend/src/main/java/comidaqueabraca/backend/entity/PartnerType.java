package comidaqueabraca.backend.entity;

public enum PartnerType {
    INDIVIDUAL("Pessoa Física"),  // Pessoa Física
    COMPANY("Empresa"),           // Empresa
    NON_GOVERNMENTAL_ORGANIZATION("Organização não-governamental"),  // Organização não-governamental
    GOVERNMENT("Órgão Governamental");  // Órgão Governamental

    private final String description;

    PartnerType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
