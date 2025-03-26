package comidaqueabraca.backend.enums;

import lombok.Getter;

@Getter
public enum DonationStatus {
    PENDING("Pendente"),
    STOCK("Estoque"),
    DONATED("Doado");

    private final String description;

    DonationStatus(String description) {
        this.description = description;
    }
}
