package comidaqueabraca.backend.entity;

public enum DeliveryMethodType {
    PICKUP("PICKUP"),
    DELIVERY("DELIVERY");

    private final String value;

    DeliveryMethodType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}