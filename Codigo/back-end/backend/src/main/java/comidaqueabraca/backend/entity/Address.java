package comidaqueabraca.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "address")
@Setter
@Getter
@NoArgsConstructor
public class Address {

    @Id
    @Column(name = "id")
    private UUID id;  // O UUID será gerado pelo banco de dados

    @Column(nullable = false, length = 150)
    private String street;

    @Column(nullable = false, length = 100)
    private String neighborhood;

    @Column(nullable = false)
    private Integer number;

    @Column(length = 100)
    private String complement;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 50)
    private String state;

    @Column(nullable = false, length = 10)
    private String zipCode;

    public Address(String street, String neighborhood, String city, String state, String zipCode) {
        this.street = street;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    // Método para garantir que o UUID seja gerado antes de persistir
    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = UUID.randomUUID();  // Gera o UUID no Java, caso não tenha sido gerado no banco
        }
    }
}
