package comidaqueabraca.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "donation")
@Getter
@Setter
@NoArgsConstructor
public abstract class Donation { // Classe abstrata
// TODO: falta adicionar annotation que liga o atributo da classe ao nome da coluna no banco de dados

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)  // Hibernate vai gerenciar a geração do UUID automaticamente
    private UUID id;

    @Column(nullable = false, length = 255)
    private String itemName;

    @Column(name = "registration_date", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime registrationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryMethodType deliveryMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DonationStatusType status;

    @ManyToOne
    @JoinColumn(name = "donor_id", nullable = false)
    private Partner donor;

    @ManyToOne
    @JoinColumn(name = "beneficiary_id")
    private Partner beneficiary;

    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    public Donation(String itemName, Partner donor,
                    DeliveryMethodType deliveryMethod, DonationStatusType status,
                    Partner beneficiary, Campaign campaign) {
        this.itemName = itemName;
        this.donor = donor;
        this.registrationDate = LocalDateTime.now();
        this.deliveryMethod = deliveryMethod;
        this.status = status;
        this.beneficiary = beneficiary;
        this.campaign = campaign;
    }
}