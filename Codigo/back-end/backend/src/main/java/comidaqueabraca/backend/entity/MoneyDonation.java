package comidaqueabraca.backend.entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Entity
@Table(name = "money_donation")
@NoArgsConstructor
public class MoneyDonation extends Donation {

    // TODO: verifcar se o generationType é melhor pelo IDENTIY ou AUTO
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "donation_id", nullable = false)
    private Donation donation;

    @Column(name = "value", nullable = false)
    private float value;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private TransactionCategoryType category;

    public MoneyDonation(Donation donation, float value, TransactionCategoryType category) {
        this.donation = donation;
        this.value = value;
        this.category = category;
    }
}
