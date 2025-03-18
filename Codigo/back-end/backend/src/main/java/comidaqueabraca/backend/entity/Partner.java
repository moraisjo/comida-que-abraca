package comidaqueabraca.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "partner")
@Getter
@Setter
@NoArgsConstructor
public class Partner extends User { // Herda de User

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PartnerType type;

    @Column(nullable = false)
    private boolean isDonor;

    @Column(nullable = false)
    private boolean wantsToReceiveDonations;

    @OneToMany(mappedBy = "partner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Donation> donations;

    @Column(nullable = false, updatable = false)
    private java.time.LocalDateTime registrationDate = java.time.LocalDateTime.now();
}
