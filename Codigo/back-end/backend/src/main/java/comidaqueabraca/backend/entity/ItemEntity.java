package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.*;
import comidaqueabraca.backend.enums.CategoryItem;
import comidaqueabraca.backend.enums.DeliveryType;
import comidaqueabraca.backend.enums.DonationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "db_item")
@PrimaryKeyJoinColumn(name = "id")
@NoArgsConstructor
@Getter
@Setter
public class ItemEntity extends DonationEntity {

    @Column(name = "quantity", nullable = false)
    private int itemQuantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private CategoryItem itemCategory;

    public ItemEntity(String name, String description, Category category, Integer donationQuantity,
                      String contactInfo, String deliveryDescription, LocalDateTime arrivingDate,
                      LocalDateTime stockEntryDate, LocalDateTime stockExitDate, DeliveryType delivery,
                      DonationStatus status, String photoUrl, PartnerEntity donor,
                      PartnerEntity beneficiary, CampaignEntity campaign,
                      int itemQuantity, CategoryItem itemCategory) {
        super(name, description, category, donationQuantity, contactInfo, deliveryDescription, arrivingDate,
                stockEntryDate, stockExitDate, delivery, status, photoUrl, donor, beneficiary, campaign);
        this.itemQuantity = itemQuantity;
        this.itemCategory = itemCategory;
    }
}
