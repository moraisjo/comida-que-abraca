package comidaqueabraca.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Entity
@Table(name = "donation") // Define o nome da tabela no banco de dados
@Getter // Lombok gera os getters automaticamente
@Setter // Lombok gera os setters automaticamente
@NoArgsConstructor // Lombok gera o construtor sem parâmetros automaticamente
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String itemName;

    @ManyToOne
    @JoinColumn(name = "donor_id", nullable = false)
    private Partner donor;

    @Column(name = "registration_date", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime registrationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryMethodType deliveryMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DonationStatusType status;

    @ManyToOne
    @JoinColumn(name = "beneficiary_id")
    private Partner beneficiary;

    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    // Constructor with all fields (optional, useful for tests or direct instantiation)
    public Donation(String itemName, Partner donor, LocalDateTime registrationDate,
                    DeliveryMethodType deliveryMethod, DonationStatusType status,
                    Partner beneficiary, Campaign campaign) {
        this.itemName = itemName;
        this.donor = donor;
        this.registrationDate = registrationDate;
        this.deliveryMethod = deliveryMethod;
        this.status = status;
        this.beneficiary = beneficiary;
        this.campaign = campaign;
    }
}