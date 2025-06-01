package comidaqueabraca.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "db_partner_requests")
@Getter
@Setter
@NoArgsConstructor
public class PartnerRequestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_type", nullable = false)
    private String itemType;

    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "request_date", updatable = false)
    private LocalDateTime requestDate = LocalDateTime.now();

    public PartnerRequestEntity(String itemType, String description, UserEntity user) {
        this.itemType = itemType;
        this.description = description;
        this.user = user;
        this.requestDate = LocalDateTime.now();
    }
}
