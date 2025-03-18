package comidaqueabraca.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Entity
@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED) // Estratégia de herança no banco
@Getter
@Setter
@NoArgsConstructor
public abstract class User { // Classe abstrata
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)  // Usando AUTO para permitir que o banco de dados gere o UUID automaticamente
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 20)
    private String phone;

    @ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_user_address"))
    private Address address;

    public User(UUID id, String name, String email, String password, String phone, Address address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
    }
}
