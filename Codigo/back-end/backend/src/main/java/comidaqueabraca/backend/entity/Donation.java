package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.entity.enums.DeliveryType;
import comidaqueabraca.backend.entity.enums.DonationStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Donation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "doador_id")
    private Partner doador;

    @Column(nullable = false, updatable = false)
    private LocalDateTime data = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryType entrega;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DonationStatus status;

    @ManyToOne
    @JoinColumn(name = "id_beneficiario")
    private Partner beneficiario;

    @ManyToOne
    @JoinColumn(name = "id_campanha")
    private Campaign campanha;
}
