package comidaqueabraca.backend.entity;

public enum DeliveryMethodType {
    PICKUP("RETIRADA"),
    DELIVERY("ENTREGA");

    private final String value;

    DeliveryMethodType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}