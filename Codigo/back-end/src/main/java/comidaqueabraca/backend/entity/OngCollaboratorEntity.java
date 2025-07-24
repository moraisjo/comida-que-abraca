package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.CollaboratorRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "db_ong_collaborator")
@Getter
@DiscriminatorValue("COLLABORATOR")
@Setter
@NoArgsConstructor
public class OngCollaboratorEntity extends UserEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private CollaboratorRole role;

    @Column(name = "admission_date", nullable = false, updatable = false)
    private LocalDateTime admissionDate = LocalDateTime.now();

    public OngCollaboratorEntity(String name, String email, String password, String phone, String address, CollaboratorRole role) {
        super(name, email, password, phone, address); // Chama o construtor da superclasse com os parâmetros
        this.role = role;
    }
}