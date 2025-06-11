package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.MoneyDonationDTO;
import comidaqueabraca.backend.service.MoneyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/money")
public class MoneyController {

    private static final Logger logger = LoggerFactory.getLogger(MoneyController.class);

    private final MoneyService moneyService;

    @Autowired
    public MoneyController(MoneyService moneyService) {
        this.moneyService = moneyService;
    }

    @GetMapping("/ordered-by-value")
    public ResponseEntity<?> getAllMoneyDonationsOrderedByValue() {
        try {
            List<MoneyDonationDTO> donations = moneyService.getAllMoneyDonationsOrderedByValue();
            return ResponseEntity.ok(donations);
        } catch (Exception e) {
            logger.error("Error fetching ordered money donations", e);
            return ResponseEntity.internalServerError().body("Error fetching ordered donations: " + e.getMessage());
        }
    }
}