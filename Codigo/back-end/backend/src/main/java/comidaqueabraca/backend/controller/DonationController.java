package comidaqueabraca.backend.controller;

import java.util.List;

import comidaqueabraca.backend.dto.CreateDonationRequestDTO;
import comidaqueabraca.backend.dto.PartnerDonationDTO;
import comidaqueabraca.backend.dto.PendingDonationDTO;
import comidaqueabraca.backend.dto.response.ResponseDTO;
import comidaqueabraca.backend.enums.DonationStatus;
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
@RequestMapping("/api/donation")
@CrossOrigin(origins = "http://localhost:5173") 
@Tag(name = "Doações", description = "Gerenciamento de doações realizadas")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @Autowired
    private DonationRepository donationRepository;

    @Operation(summary = "Solicitação de uma nova doação")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Doação criada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Erro nos dados da requisição"),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    })
    @PostMapping("/request")
    public ResponseEntity<ResponseDTO> requestDonation(@RequestBody @Valid CreateDonationRequestDTO request) {
        try {
            donationService.createDonation(request);
            ResponseDTO response = new ResponseDTO("Doação solicitada com sucesso!", 201);
            return ResponseEntity.status(201).body(response);
        } catch (RuntimeException e) {
            ResponseDTO response = new ResponseDTO(e.getMessage(), 400);
            return ResponseEntity.status(400).body(response);
        } catch (Exception e) {
            ResponseDTO response = new ResponseDTO("Erro interno: " + e.getMessage(), 500);
            return ResponseEntity.status(500).body(response);
        }
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

    @Operation(summary = "Lista todas as doações de um parceiro pelo ID do usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de doações retornada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Parceiro não encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping("/partner/{partnerUserId}")
    public ResponseEntity<List<PartnerDonationDTO>> getDonationsByPartnerUserId(@PathVariable Long partnerUserId) {
        List<PartnerDonationDTO> donations = donationService.getDonationsByPartnerUserId(partnerUserId);
        return ResponseEntity.ok(donations);
    }


    @Operation(summary = "Lista todas as doações em estoque")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de doações em estoque"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping("/stock")
    public ResponseEntity<List<DonationEntity>> listDonationStock() {
        List<DonationEntity> donations = donationService.getDonationsStock();
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

    @Operation(summary = "Lista todas as doações pendentes de entrega")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de doações pendentes de entrega retornada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping("/pending-deliveries")
    public ResponseEntity<List<PendingDonationDTO>> listPendingDeliveries() {
        List<PendingDonationDTO> result = donationService.pendingDeliveries();
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Aceita ou rejeita uma solicitação de doação")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Doação atualizada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Doação não encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @PutMapping("/update-status/{donationId}/{status}")
    public ResponseEntity<ResponseDTO> updateDonationStatus(
            @PathVariable Long donationId,
            @PathVariable DonationStatus status) {

        try {
            donationService.updateDonationStatus(donationId, status);

            String message = (status == DonationStatus.PENDING_DELIVERY)
                    ? "Doação aceita com sucesso!"
                    : "Doação rejeitada com sucesso!";

            ResponseDTO response = new ResponseDTO(message, 200);
            return ResponseEntity.status(200).body(response);

        } catch (RuntimeException e) {
            ResponseDTO response = new ResponseDTO(e.getMessage(), 404);
            return ResponseEntity.status(404).body(response);

        } catch (Exception e) {
            ResponseDTO response = new ResponseDTO("Erro interno no servidor: " + e.getMessage(), 500);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Operation(summary = "Registra uma entrada de doação no estoque")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Doação atualizada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Doação não encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @PutMapping("/update-stock/{donationId}/{status}")
    public ResponseEntity<ResponseDTO> updateDonationStock(
            @PathVariable Long donationId,
            @PathVariable DonationStatus status) {
        try {
            donationService.updateDonationStock(donationId, status);

            String message = "Status da doação atualizado com sucesso!";
            ResponseDTO response = new ResponseDTO(message, 200);
            return ResponseEntity.status(200).body(response);

        } catch (RuntimeException e) {
            ResponseDTO response = new ResponseDTO(e.getMessage(), 404);
            return ResponseEntity.status(404).body(response);

        } catch (Exception e) {
            ResponseDTO response = new ResponseDTO("Erro interno no servidor: " + e.getMessage(), 500);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Operation(summary = "Registra uma saída de doação para um beneficiário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Doação atualizada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Doação não encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @PutMapping("/update-output/{donationId}/{beneficiaryId}")
    public ResponseEntity<ResponseDTO> updateDonationOutput(
            @PathVariable Long donationId,
            @PathVariable Integer beneficiaryId) {
        try {
            donationService.updateDonationOutput(donationId, beneficiaryId);

            String message = "Status da doação atualizado com sucesso!";
            ResponseDTO response = new ResponseDTO(message, 200);
            return ResponseEntity.status(200).body(response);

        } catch (RuntimeException e) {
            ResponseDTO response = new ResponseDTO(e.getMessage(), 404);
            return ResponseEntity.status(404).body(response);

        } catch (Exception e) {
            ResponseDTO response = new ResponseDTO("Erro interno no servidor: " + e.getMessage(), 500);
            return ResponseEntity.status(500).body(response);
        }
    }

}