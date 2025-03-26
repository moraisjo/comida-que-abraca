package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.CategoryItem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "db_item")
@PrimaryKeyJoinColumn(name = "id")
@Getter
@Setter
public class Item extends DonationEntity {

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private CategoryItem category;
}
