package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.CampaignStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record CampaignDTO(
        @NotBlank String name,

        String description,

        Integer addressId,

        @NotNull LocalDate startDate,

        @NotNull LocalDate endDate,

        String photoUrl,

        @NotNull CampaignStatus status
) {}
