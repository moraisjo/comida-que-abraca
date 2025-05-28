package comidaqueabraca.backend.dto.response;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
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
