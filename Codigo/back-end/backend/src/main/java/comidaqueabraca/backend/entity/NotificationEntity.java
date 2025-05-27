package comidaqueabraca.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "db_notification")
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "campaign_id", nullable = false)
    private CampaignEntity campaign;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "message", nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "sent_date", nullable = false, updatable = false)
    private LocalDateTime sentDate = LocalDateTime.now();

    @Column(name = "visualized", nullable = false)
    private boolean visualized = false;

    @Column(name = "visualized_date")
    private LocalDateTime visualizedDate;

    public NotificationEntity(UserEntity user, CampaignEntity campaign,String title, String message) {
        this.user = user;
        this.campaign = campaign;
        this.title = title;
        this.message = message;
        this.sentDate = LocalDateTime.now();
        this.visualized = false;
        this.visualizedDate = null;
    }
}
