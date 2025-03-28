package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.CampaignStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public record CampaignDTO(
        @NotBlank String name,
        @NotBlank String description,
        String photoUrl,

        @FutureOrPresent(message = "A data de início deve ser hoje ou no futuro.")
        LocalDate startDate,
        LocalDate endDate,

        Integer addressId,
        CampaignStatus status
) {}