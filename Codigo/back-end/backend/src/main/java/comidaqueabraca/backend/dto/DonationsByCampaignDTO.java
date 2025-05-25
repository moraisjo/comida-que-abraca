package comidaqueabraca.backend.dto;

public record DonationsByCampaignDTO(
    String campaignName,
    Long donationCount
) {}
