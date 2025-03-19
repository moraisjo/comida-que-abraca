package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.entity.enums.CategoryTransaction;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@Table(name = "money")
@PrimaryKeyJoinColumn(name = "id")
@Getter
@Setter
public class Money extends Donation {
    @Column(name = "valor", nullable = false)
    private float valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria", nullable = false)
    private CategoryTransaction categoria;
}
