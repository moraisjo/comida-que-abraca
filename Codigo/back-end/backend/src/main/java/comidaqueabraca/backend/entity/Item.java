package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.entity.enums.CategoryItem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Item")
@PrimaryKeyJoinColumn(name = "id")
public class Item extends Donation {
    @Column(name = "quantidade", nullable = false)
    private int quantidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria", nullable = false)
    private CategoryItem categoria;
}

