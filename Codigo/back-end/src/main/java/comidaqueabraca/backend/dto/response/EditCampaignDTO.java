package comidaqueabraca.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EditCampaignDTO {
    String name;
    String description;
    LocalDate startDate;
    LocalDate endDate;
    String photoUrl;
}
