package comidaqueabraca.backend.entity;

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
    private int quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private CategoryItem category;

    public ItemEntity(String name, LocalDateTime arrivingDate, LocalDateTime stockEntryDate, LocalDateTime stockExitDate, DeliveryType delivery, DonationStatus status, String photoUrl, PartnerEntity donor, PartnerEntity beneficiary, CampaignEntity campaign, int quantity, CategoryItem category) {
        super(name, arrivingDate, stockEntryDate, stockExitDate, delivery, status, photoUrl, donor, beneficiary, campaign);
        this.quantity = quantity;
        this.category = category;
    }
}
