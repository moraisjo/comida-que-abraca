package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.CategoryTransaction;
import comidaqueabraca.backend.enums.DeliveryType;
import comidaqueabraca.backend.enums.DonationStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "db_money")
@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "id") // Usa o mesmo ID da superclasse como chave primária (trabalha junto com InheritanceType.JOINED)
public class MoneyEntity extends DonationEntity {

    @Column(name = "value", nullable = false)
    private float value;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private CategoryTransaction category;

    public MoneyEntity(String name, LocalDateTime arrivingDate, LocalDateTime stockEntryDate, LocalDateTime stockExitDate, DeliveryType delivery, DonationStatus status, String photoUrl, PartnerEntity donor, PartnerEntity beneficiary, CampaignEntity campaign, float value, CategoryTransaction category) {
        super(name, arrivingDate, stockEntryDate, stockEntryDate, delivery, status, photoUrl, donor, beneficiary, campaign); // Chama o construtor da superclasse DonationEntity
        this.value = value;
        this.category = category;
    }
}