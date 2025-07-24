package comidaqueabraca.backend.dto;

public record DetailMonthlyDonationTypeReportData(
        String donationName,
        String campaignName,
        String donationMonthYear,
        String donationType
) {
}