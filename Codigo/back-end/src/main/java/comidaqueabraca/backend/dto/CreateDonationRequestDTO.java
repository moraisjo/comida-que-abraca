package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.Category;
import comidaqueabraca.backend.enums.DeliveryType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateDonationRequestDTO {
    private String name;
    private String description;
    private Category category;
    private Integer quantity;
    private String contactInfo;
    private String deliveryDescription;
    private DeliveryType delivery;
    private String photoUrl;
    private Integer donor;
    private Integer campaign;
}
