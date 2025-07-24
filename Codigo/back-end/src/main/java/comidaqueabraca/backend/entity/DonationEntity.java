package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.Category;
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
@Inheritance(strategy = InheritanceType.JOINED)
public class DonationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private Category category;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "contact_info")
    private String contactInfo;

    @Column(name = "delivery_description", nullable = false)
    private String deliveryDescription;

    @Column(name = "request_date", nullable = false)
    private LocalDateTime requestDate;

    @Column(name = "arriving_date")
    private LocalDateTime arrivingDate;

    @Column(name = "stock_entry_date")
    private LocalDateTime stockEntryDate;

    @Column(name = "stock_exit_date")
    private LocalDateTime stockExitDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery", nullable = false)
    private DeliveryType delivery;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private DonationStatus status;

    @Column(name = "photo_url", nullable = false)
    private String photoUrl;

    @ManyToOne
    @JoinColumn(name = "donor_id", nullable = false)
    private PartnerEntity donor;

    @ManyToOne
    @JoinColumn(name = "beneficiary_id")
    private PartnerEntity beneficiary;

    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private CampaignEntity campaign;

    public DonationEntity(String name, String description, Category category, Integer quantity,
                          String contactInfo, String deliveryDescription, LocalDateTime arrivingDate,
                          LocalDateTime stockEntryDate, LocalDateTime stockExitDate, DeliveryType delivery,
                          DonationStatus status, String photoUrl, PartnerEntity donor,
                          PartnerEntity beneficiary, CampaignEntity campaign) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
        this.contactInfo = contactInfo;
        this.deliveryDescription = deliveryDescription;
        this.arrivingDate = arrivingDate;
        this.stockEntryDate = stockEntryDate;
        this.stockExitDate = stockExitDate;
        this.delivery = delivery;
        this.status = status;
        this.photoUrl = photoUrl;
        this.donor = donor;
        this.beneficiary = beneficiary;
        this.campaign = campaign;
    }
}
