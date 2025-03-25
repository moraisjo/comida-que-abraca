package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.MoneyDonationDTO;
import comidaqueabraca.backend.entity.MoneyEntity;
import comidaqueabraca.backend.service.MoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/money-donations")
public class MoneyController {

    private final MoneyService moneyService;

    @Autowired
    public MoneyController(MoneyService moneyService) {
        this.moneyService = moneyService;
    }

    @GetMapping
    public ResponseEntity<List<MoneyEntity>> getAllMoneyDonations() {
        return ResponseEntity.ok(moneyService.getAllMoneyDonations());
    }

    @GetMapping("/ordered-by-value")
    public ResponseEntity<List<MoneyDonationDTO>> getAllMoneyDonationsOrderedByValue() {
        return ResponseEntity.ok(moneyService.getAllMoneyDonationsOrderedByValue());
    }
}