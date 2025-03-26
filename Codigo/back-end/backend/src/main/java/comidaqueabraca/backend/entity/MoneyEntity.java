package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.CategoryTransaction;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@Table(name = "db_money")
@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "id") // Usa o mesmo ID da superclasse como chave primária (trabalha junto com InheritanceType.JOINED)
public class MoneyEntity extends DonationEntity {

    @Column(name = "value", nullable = false)
    private float value;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private CategoryTransaction category;

    public MoneyEntity(float value, CategoryTransaction category) {
        super(); // Não precisa passar ID, pois o banco gera automaticamente
        this.value = value;
        this.category = category;
    }
}