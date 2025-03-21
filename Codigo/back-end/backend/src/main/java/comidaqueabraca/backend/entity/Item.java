package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.CategoryItem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "item")
@PrimaryKeyJoinColumn(name = "id")
@Getter
@Setter
public class Item extends Donation {
    @Column(name = "quantidade", nullable = false)
    private int quantidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria", nullable = false)
    private CategoryItem categoria;
}

