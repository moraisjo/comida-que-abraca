package comidaqueabraca.backend.dto;

public record DonationsPerMonthDTO(
    Integer monthNumber,
    String monthName,
    Long totalDonations
) {}
