package comidaqueabraca.backend.enums;

import lombok.Getter;

@Getter
public enum CampaignStatus {
    ACTIVE("Ativa"),
    FINISHED("Finalizada"),
    CANCELED("Cancelada");

    private final String description;

    CampaignStatus(String description) {
        this.description = description;
    }
}
