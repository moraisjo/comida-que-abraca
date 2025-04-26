package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.CategoryFood;
import comidaqueabraca.backend.enums.DeliveryType;
import comidaqueabraca.backend.enums.DonationStatus;
import comidaqueabraca.backend.enums.Unitmeasurement;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "db_food")
@PrimaryKeyJoinColumn(name = "id")
@NoArgsConstructor
@Getter
@Setter
public class FoodEntity extends DonationEntity {
    @Column(name = "isPerishable", nullable = false)
    private boolean isPerishable;

    @Column(name = "expirationDate")
    private LocalDateTime expirationDate;

    @Column(name = "quantity", nullable = false)
    private float quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit", nullable = false)
    private Unitmeasurement unit;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private CategoryFood category;

    public FoodEntity(String name, LocalDateTime arrivingDate, LocalDateTime stockEntryDate, LocalDateTime stockExitDate, DeliveryType delivery, DonationStatus status, String photoUrl, PartnerEntity donor, PartnerEntity beneficiary, CampaignEntity campaign, boolean isPerishable, LocalDateTime expirationDate, float quantity, Unitmeasurement unit, CategoryFood category) {
        super(name, arrivingDate, stockEntryDate, stockExitDate, delivery, status, photoUrl, donor, beneficiary, campaign);
        this.isPerishable = isPerishable;
        this.expirationDate = expirationDate;
        this.quantity = quantity;
        this.unit = unit;
        this.category = category;
    }
}
