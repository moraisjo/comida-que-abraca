package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.entity.DonationEntity;
import comidaqueabraca.backend.enums.DeliveryType;
import comidaqueabraca.backend.enums.DonationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PartnerDonationDTO {
    private Long id;
    private String name;
    private LocalDateTime requestDate;
    private String delivery;
    private String status;
    private String photoUrl;
    private String campaignName;

    public PartnerDonationDTO(
            Long id,
            String name,
            LocalDateTime requestDate,
            DeliveryType delivery,
            DonationStatus status,
            String photoUrl,
            CampaignEntity campaign
    ) {
        this.id = id;
        this.name = name;
        this.requestDate = requestDate;
        this.delivery = delivery != null ? delivery.name() : null;
        this.status = status != null ? status.name() : null;
        this.photoUrl = photoUrl;
        this.campaignName = campaign != null ? campaign.getName() : null;
    }
}
