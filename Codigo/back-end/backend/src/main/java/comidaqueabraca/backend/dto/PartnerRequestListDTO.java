package comidaqueabraca.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PartnerRequestListDTO  {
    private Integer id;
    private String itemType;
    private String description;
    private LocalDateTime requestDate;
    private UserRequestDTO user;

    public PartnerRequestListDTO (Integer id, String itemType, String description, LocalDateTime requestDate, UserRequestDTO user) {
        this.id = id;
        this.itemType = itemType;
        this.description = description;
        this.requestDate = requestDate;
        this.user = user;
    }
}
