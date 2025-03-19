package comidaqueabraca.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String rua;

    @Column(nullable = false, length = 255)
    private String bairro;

    @Column(nullable = false)
    private int numero;

    @Column(length = 255)
    private String complemento;

    @Column(nullable = false, length = 255)
    private String cidade;

    @Column(nullable = false, length = 100)
    private String estado;

    @Column(nullable = false, length = 20)
    private String cep;
}

