package comidaqueabraca.backend.entity;

public enum DonationStatusType {
    PENDING("PENDENTE"),
    STOCK("ESTOQUE"),
    DONATED("DOADO");

    private final String value;

    DonationStatusType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}