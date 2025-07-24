package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.LegalEntityType;

public record PartnerDTO(
        String name,
        String email,
        Boolean wantsToDonate,
        Boolean wantsToReceiveDonations,
        LegalEntityType legalEntityType
) {}