package comidaqueabraca.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PartnerRequestDTO {
    private Integer id;
    private String itemType;
    private String description;
    private LocalDateTime requestDate;
    private UserDTO user;

    public PartnerRequestDTO(Integer id, String itemType, String description, LocalDateTime requestDate, UserDTO user) {
        this.id = id;
        this.itemType = itemType;
        this.description = description;
        this.requestDate = requestDate;
        this.user = user;
    }
}
