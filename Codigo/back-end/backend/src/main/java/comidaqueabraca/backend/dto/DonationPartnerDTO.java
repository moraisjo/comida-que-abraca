package comidaqueabraca.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationPartnerDTO {
    private String name;
    private String email;
    private String phone;

    public static DonationPartnerDTO fromEntity(comidaqueabraca.backend.entity.PartnerEntity partner) {
        if (partner == null) return null;
        return new DonationPartnerDTO(
                partner.getName(),
                partner.getEmail(),
                partner.getPhone()
        );
    }
}
