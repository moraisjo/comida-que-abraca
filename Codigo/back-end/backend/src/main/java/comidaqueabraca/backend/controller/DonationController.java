package comidaqueabraca.backend.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import comidaqueabraca.backend.entity.DonationEntity;
import comidaqueabraca.backend.service.DonationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doacoes")
@Tag(name = "Doações", description = "Gerenciamento de doações realizadas")
public class DonationController {

    @Autowired
    private DonationService donationService;

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

    @Operation(summary = "Lista todas as doações realizadas cadastrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de doações retornada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping
    public ResponseEntity<List<String>> listDonation() {
        return ResponseEntity.ok(List.of("Doação 1", "Doação 2"));
    }   
}
