package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.Category;
import comidaqueabraca.backend.enums.DeliveryType;
import comidaqueabraca.backend.enums.DonationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationDTO {
    private Long id;
    private String name;
    private String description;
    private Category category;
    private Integer quantity;
    private String contactInfo;
    private String deliveryDescription;
    private LocalDateTime requestDate;
    private LocalDateTime arrivingDate;
    private LocalDateTime stockEntryDate;
    private LocalDateTime stockExitDate;
    private DeliveryType delivery;
    private DonationStatus status;
    private String photoUrl;
    private DonationPartnerDTO donor;
    private DonationPartnerDTO beneficiary;
    private DonationCampaignDTO campaign;

    public static DonationDTO fromEntity(comidaqueabraca.backend.entity.DonationEntity donation) {
        if (donation == null) return null;

        return new DonationDTO(
                donation.getId(),
                donation.getName(),
                donation.getDescription(),
                donation.getCategory(),
                donation.getQuantity(),
                donation.getContactInfo(),
                donation.getDeliveryDescription(),
                donation.getRequestDate(),
                donation.getArrivingDate(),
                donation.getStockEntryDate(),
                donation.getStockExitDate(),
                donation.getDelivery(),
                donation.getStatus(),
                donation.getPhotoUrl(),
                DonationPartnerDTO.fromEntity(donation.getDonor()),
                DonationPartnerDTO.fromEntity(donation.getBeneficiary()),
                DonationCampaignDTO.fromEntity(donation.getCampaign())
        );
    }
}
