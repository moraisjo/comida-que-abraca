package comidaqueabraca.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationCampaignDTO {
    private String name;

    public static DonationCampaignDTO fromEntity(comidaqueabraca.backend.entity.CampaignEntity campaign) {
        if (campaign == null) return null;
        return new DonationCampaignDTO(campaign.getName());
    }
}
