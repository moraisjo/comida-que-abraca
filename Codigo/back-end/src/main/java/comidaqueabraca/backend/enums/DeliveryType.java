package comidaqueabraca.backend.enums;

import lombok.Getter;

@Getter
public enum DeliveryType {
    PICKUP("Retirada no local"),
    DELIVERY("Entrega");

    private final String description;

    DeliveryType(String description) {
        this.description = description;
    }
}
