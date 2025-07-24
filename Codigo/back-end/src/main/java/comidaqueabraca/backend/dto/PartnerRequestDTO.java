package comidaqueabraca.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartnerRequestDTO {
    private String itemType;
    private String description;
    private Integer userId;
}
