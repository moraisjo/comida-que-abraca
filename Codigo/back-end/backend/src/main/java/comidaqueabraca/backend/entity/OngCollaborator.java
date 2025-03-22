package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.CollaboratorRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "db_ong_collaborator")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OngCollaborator extends UserEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private CollaboratorRole role;

    @Column(name = "admission_date", nullable = false, updatable = false)
    private LocalDateTime admissionDate = LocalDateTime.now();
}