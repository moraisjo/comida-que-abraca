package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.LegalEntityType;

public record CreatePartnerDTO(
        String name,
        String email,
        String password,
        String phone,
        String address,
        Boolean wantsToDonate,
        Boolean wantsToReceiveDonations,
        LegalEntityType legalEntityType
) {}