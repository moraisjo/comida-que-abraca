package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.entity.enums.CategoryFood;
import comidaqueabraca.backend.entity.enums.Unitmeasurement;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "food")
@PrimaryKeyJoinColumn(name = "id")
@Getter
@Setter
public class Food extends Donation {
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
