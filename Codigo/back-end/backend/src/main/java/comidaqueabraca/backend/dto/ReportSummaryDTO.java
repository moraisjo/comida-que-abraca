package comidaqueabraca.backend.dto;

public record ReportSummaryDTO(
    long totalDoacoes,
    long totalCampanhas,
    long totalParceiros,
    long totalAlimentos,
    long totalItens,
    long totalDinheiro,
    long totalCampanhasAtivas,
    long totalDoacoesAtivas
) {}
