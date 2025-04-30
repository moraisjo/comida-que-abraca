package comidaqueabraca.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PendingDonationDTO {
    private Long id;
    private String name;
    private LocalDateTime requestDate;
    private String delivery;
    private String status;
    private String photoUrl;
    private String donorName;
    private String campaignName;

    public PendingDonationDTO(Long id, String name, LocalDateTime requestDate, String delivery, String status, String photoUrl,  String donorName, String campaignName) {
        this.id = id;
        this.name = name;
        this.requestDate = requestDate;
        this.delivery = delivery;
        this.status = status;
        this.photoUrl = photoUrl;
        this.donorName = donorName;
        this.campaignName = campaignName;
    }
}
