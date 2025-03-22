package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.DeliveryType;
import comidaqueabraca.backend.enums.DonationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "db_donation")
@Getter
@Setter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)  // Define herança JOINED (trabalha junto com @PrimaryKeyJoinColumn(name = "id"))
public class DonationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "date", nullable = false, updatable = false)
    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery", nullable = false)
    private DeliveryType delivery;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private DonationStatus status;

    @ManyToOne
    @JoinColumn(name = "donor_id", nullable = false)
    private PartnerEntity donor;

    @ManyToOne
    @JoinColumn(name = "beneficiary_id")
    private PartnerEntity beneficiary;

    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private CampaignEntity campaign;

    public DonationEntity(String name, DeliveryType delivery, DonationStatus status, PartnerEntity donor, PartnerEntity beneficiary, CampaignEntity campaign) {
        this.name = name;
        this.delivery = delivery;
        this.status = status;
        this.donor = donor;
        this.beneficiary = beneficiary;
        this.campaign = campaign;
        this.date = (date == null) ? LocalDateTime.now() : date;
    }
}
