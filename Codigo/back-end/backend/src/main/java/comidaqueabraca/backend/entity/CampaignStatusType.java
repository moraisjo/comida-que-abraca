package comidaqueabraca.backend.entity;

public enum CampaignStatusType {
    ACTIVE("Ativa"),
    FINISHED("Finalizada"),
    CANCELLED("Cancelada");

    private final String status;

    CampaignStatusType(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    // TODO: pesquisar se esse Método para converter de String para o enum (útil para a conversão de valores vindos do banco) é necessário
    public static CampaignStatusType fromString(String status) {
        for (CampaignStatusType cs : CampaignStatusType.values()) {
            if (cs.status.equalsIgnoreCase(status)) {
                return cs;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + status);
    }
}