package comidaqueabraca.backend.entity;

import comidaqueabraca.backend.enums.CollaboratorRole;
import jakarta.persistence.*;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "collaborator")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Collaborator extends User {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CollaboratorRole cargo;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dataAdmissao = LocalDateTime.now();
}
