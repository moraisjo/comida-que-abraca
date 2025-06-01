package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.PartnerRequestDTO;
import comidaqueabraca.backend.entity.PartnerRequestEntity;
import comidaqueabraca.backend.service.PartnerRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
@Tag(name = "Partner Requests", description = "Endpoints para gerenciar solicitações de um parceiro")
public class PartnerRequestController {

    @Autowired
    private PartnerRequestService partnerRequestService;

    @PostMapping
    @Operation(summary = "Criar solicitação", description = "Cria uma nova solicitação associada a um usuário")
    public ResponseEntity<PartnerRequestEntity> createRequest(
            @RequestParam Integer userId,
            @RequestBody PartnerRequestEntity request) {
        PartnerRequestEntity savedRequest = partnerRequestService.createRequest(userId, request);
        return ResponseEntity.ok(savedRequest);
    }

    @GetMapping
    @Operation(summary = "Listar todas as solicitações", description = "Retorna todas as solicitações cadastradas")
    public ResponseEntity<List<PartnerRequestDTO>> getAllRequests() {
        return ResponseEntity.ok(partnerRequestService.getAllRequests());
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Listar solicitações de um usuário", description = "Retorna todas as solicitações feitas por um usuário")
    public ResponseEntity<?> getRequestsByUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(partnerRequestService.getRequestsByUser(userId));
    }
}
