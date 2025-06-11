package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.*;
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
    private float foodQuantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit", nullable = false)
    private Unitmeasurement unit;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private CategoryFood foodCategory;

    public FoodEntity(String name, String description, Category category, Integer quantity,
                      String contactInfo, String deliveryDescription, LocalDateTime arrivingDate,
                      LocalDateTime stockEntryDate, LocalDateTime stockExitDate, DeliveryType delivery,
                      DonationStatus status, String photoUrl, PartnerEntity donor,
                      PartnerEntity beneficiary, CampaignEntity campaign,
                      boolean isPerishable, LocalDateTime expirationDate, float foodQuantity,
                      Unitmeasurement unit, CategoryFood foodCategory) {
        super(name, description, category, quantity, contactInfo, deliveryDescription, arrivingDate,
                stockEntryDate, stockExitDate, delivery, status, photoUrl, donor, beneficiary, campaign);
        this.isPerishable = isPerishable;
        this.expirationDate = expirationDate;
        this.foodQuantity = foodQuantity;
        this.unit = unit;
        this.foodCategory = foodCategory;
    }
}
