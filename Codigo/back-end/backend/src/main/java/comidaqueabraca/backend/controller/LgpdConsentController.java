package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.service.LgpdConsentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lgpd")
@Tag(name = "LGPD", description = "Controle de aceite de termos de consentimento de dados")
public class LgpdConsentController {

    @Autowired
    private LgpdConsentService lgpdConsentService;

    // Endpoint para registrar a data/hora do aceite da LGPD
    @PutMapping("/consent/{id}")
    public ResponseEntity<String> registerConsent(@PathVariable Integer id) {
        lgpdConsentService.saveConsentDate(id);
        return ResponseEntity.ok("Consentimento LGPD registrado com sucesso.");
    }
}