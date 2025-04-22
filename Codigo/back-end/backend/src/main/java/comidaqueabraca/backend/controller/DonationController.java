package comidaqueabraca.backend.controller;
import java.util.List;

import comidaqueabraca.backend.dto.PendingDonationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import comidaqueabraca.backend.entity.DonationEntity;
import comidaqueabraca.backend.repository.DonationRepository;
import comidaqueabraca.backend.service.DonationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doacoes")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Doações", description = "Gerenciamento de doações realizadas")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @Autowired
    private DonationRepository donationRepository;

    @Operation(summary = "Cadastra uma nova doação")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Doação cadastrada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Erro de validação dos dados"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @PostMapping
        public ResponseEntity<String> createDonation(@Valid @RequestBody DonationEntity donation, BindingResult result) {
        if (result.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            result.getAllErrors().forEach(error -> errors.append(error.getDefaultMessage()).append(". "));
            return ResponseEntity.badRequest().body(errors.toString());
        }

        donationService.createDonation(donation);
        return ResponseEntity.ok("Cadastro realizado com sucesso!");
    }

    @Operation(summary = "Lista todas as doações realizadas cadastradas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de doações retornada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping
    public ResponseEntity<List<DonationEntity>> listDonation() {
        List<DonationEntity> donations = donationRepository.findAll();
        return ResponseEntity.ok(donations);
    }

    @Operation(summary = "Lista todas as doações pendentes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de doações pendentes retornada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping("/pending-donations")
    public ResponseEntity<List<PendingDonationDTO>> listPendingDonationsWithDetails() {
        List<PendingDonationDTO> result = donationService.pendingDonations();
        return ResponseEntity.ok(result);
    }
}