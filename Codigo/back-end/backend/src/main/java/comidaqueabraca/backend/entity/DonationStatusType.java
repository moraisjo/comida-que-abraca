package comidaqueabraca.backend.entity;

public enum DonationStatusType {
    PENDING("PENDING"),
    STOCK("STOCK"),
    DONATED("DONATED");

    private final String value;

    DonationStatusType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}