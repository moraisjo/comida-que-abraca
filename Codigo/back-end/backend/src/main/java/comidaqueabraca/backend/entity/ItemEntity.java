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

    public ItemEntity(String name, LocalDateTime arrivingDate, DeliveryType delivery, DonationStatus status, PartnerEntity donor, PartnerEntity beneficiary, CampaignEntity campaign, int quantity, CategoryItem category) {
        super(name, arrivingDate, delivery, status, donor, beneficiary, campaign);
        this.quantity = quantity;
        this.category = category;
    }
}
