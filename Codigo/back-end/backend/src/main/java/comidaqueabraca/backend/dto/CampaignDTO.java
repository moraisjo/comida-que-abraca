package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.CampaignStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
public record CampaignDTO(
        @NotBlank String name,
        String description,
        @NotBlank String address,
        @NotNull @Future LocalDate startDate,
        @NotNull @Future LocalDate endDate,
        String photoUrl,
        CampaignStatus status
) {}