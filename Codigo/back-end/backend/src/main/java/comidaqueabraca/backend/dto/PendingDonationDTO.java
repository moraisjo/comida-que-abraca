package comidaqueabraca.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PendingDonationDTO {
    private Long id;
    private String name;
    private LocalDateTime arrivingDate;
    private String delivery;
    private String status;
    private String donorName;
    private String campaignName;

    public PendingDonationDTO(Long id, String name, LocalDateTime arrivingDate, String delivery, String status, String donorName, String campaignName) {
        this.id = id;
        this.name = name;
        this.arrivingDate = arrivingDate;
        this.delivery = delivery;
        this.status = status;
        this.donorName = donorName;
        this.campaignName = campaignName;
    }
}
