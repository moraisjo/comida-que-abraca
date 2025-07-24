package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.Category;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PendingDonationDTO {
    private Long id;
    private String name;
    private String description;
    private Category category;
    private Integer quantity;
    private String contactInfo;
    private String deliveryDescription;
    private LocalDateTime requestDate;
    private String delivery;
    private String status;
    private String photoUrl;
    private String donorName;
    private String campaignName;

    public PendingDonationDTO(Long id, String name, String description, Category category, Integer quantity,
                              String contactInfo, String deliveryDescription, LocalDateTime requestDate,
                              String delivery, String status, String photoUrl, String donorName, String campaignName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
        this.contactInfo = contactInfo;
        this.deliveryDescription = deliveryDescription;
        this.requestDate = requestDate;
        this.delivery = delivery;
        this.status = status;
        this.photoUrl = photoUrl;
        this.donorName = donorName;
        this.campaignName = campaignName;
    }
}
