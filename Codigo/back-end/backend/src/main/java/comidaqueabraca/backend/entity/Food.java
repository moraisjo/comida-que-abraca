package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.CategoryFood;
import comidaqueabraca.backend.enums.Unitmeasurement;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "db_food")
@PrimaryKeyJoinColumn(name = "id")
@Getter
@Setter
public class Food extends DonationEntity {

    @Column(name = "isPerishable", nullable = false)
    private boolean isPerishable;

    @Column(name = "expirationDate")
    private LocalDateTime expirationDate;

    @Column(name = "quantity", nullable = false)
    private float quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit", nullable = false)
    private Unitmeasurement unit;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private CategoryFood category;
}
