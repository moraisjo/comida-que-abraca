package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.CampaignStatus;
import java.time.LocalDate;

public record CreateCampaignDTO(
        String name,
        String description,
        Integer addressId,
        LocalDate startDate,
        LocalDate endDate,
        String photoUrl,
        CampaignStatus status
) {}