package comidaqueabraca.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "address")
@Getter
@Setter
@NoArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rua", nullable = false, length = 255)
    private String rua;

    @Column(name = "bairro", nullable = false, length = 255)
    private String bairro;

    @Column(name = "numero", nullable = false)
    private int numero;

    @Column(name = "complemento", length = 255)
    private String complemento;

    @Column(name = "cidade", nullable = false, length = 255)
    private String cidade;

    @Column(name = "estado", nullable = false, length = 100)
    private String estado;

    @Column(name = "cep", nullable = false, length = 20)
    private String cep;

    public Address(String rua, String bairro, int numero, String complemento, String cidade, String estado, String cep) {
        this.rua = rua;
        this.bairro = bairro;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
    }
}
