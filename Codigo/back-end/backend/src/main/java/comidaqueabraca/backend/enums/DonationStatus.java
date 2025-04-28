package comidaqueabraca.backend.enums;

import lombok.Getter;

@Getter
public enum DonationStatus {
    PENDING("Pendente"),
    PENDING_DELIVERY("Pendente de Entrega"),
    STOCK("Estoque"),
    DONATED("Doado");

    private final String description;

    DonationStatus(String description) {
        this.description = description;
    }
}
