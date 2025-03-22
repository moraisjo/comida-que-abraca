package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.CategoryFood;
import comidaqueabraca.backend.enums.Unitmeasurement;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@Table(name = "food")
@PrimaryKeyJoinColumn(name = "id")
@Getter
@Setter
public class Food extends DonationEntity {
    @Column(name = "ehPerecivel", nullable = false)
    private boolean ehPerecivel;

    @Column(name = "vencimento")
    private java.time.LocalDateTime vencimento;

    @Column(name = "quantidade", nullable = false)
    private float quantidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "unidade", nullable = false)
    private Unitmeasurement unidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria", nullable = false)
    private CategoryFood categoria;
}
