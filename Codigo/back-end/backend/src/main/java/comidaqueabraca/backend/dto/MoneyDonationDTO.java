package comidaqueabraca.backend.dto;

import comidaqueabraca.backend.enums.CategoryTransaction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MoneyDonationDTO {
    private String donorName;
    private float donatedAmount;
    private CategoryTransaction paymentCategory;
    private LocalDateTime donationDate;
}