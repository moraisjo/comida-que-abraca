package comidaqueabraca.backend.enums;

import lombok.Getter;

@Getter
public enum DonationStatus {
    PENDING("Pendente"),
    ACCEPTED("Aceita"),
    REJECTED("Rejeitada"),
    PENDING_DELIVERY("Pendente de Entrega"),
    CANCELED_DELIVERY ("Entrega Cancelada"),
    STOCK("Estoque"),
    DONATED("Doado");

    private final String description;

    DonationStatus(String description) {
        this.description = description;
    }
}
