package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.PartnerRequestDTO;
import comidaqueabraca.backend.dto.PartnerRequestListDTO;
import comidaqueabraca.backend.dto.response.ResponseDTO;
import comidaqueabraca.backend.entity.PartnerRequestEntity;
import comidaqueabraca.backend.service.PartnerRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Partner Requests", description = "Endpoints para gerenciar solicitações de um parceiro")
public class PartnerRequestController {

    @Autowired
    private PartnerRequestService partnerRequestService;

    @PostMapping
    @Operation(summary = "Criar solicitação", description = "Cria uma nova solicitação associada a um usuário")
    public ResponseEntity<ResponseDTO> createRequest(@RequestBody PartnerRequestDTO requestDTO) {
        try {
            partnerRequestService.createRequest(requestDTO);
            ResponseDTO response = new ResponseDTO("Solicitação criada com sucesso", 201);
            return ResponseEntity.status(201).body(response);
        } catch (RuntimeException e) {
            ResponseDTO response = new ResponseDTO("Erro ao criar solicitação: " + e.getMessage(), 400);
            return ResponseEntity.status(400).body(response);
        }
    }

    @GetMapping
    @Operation(summary = "Listar todas as solicitações", description = "Retorna todas as solicitações cadastradas")
    public ResponseEntity<List<PartnerRequestListDTO>> getAllRequests() {
        return ResponseEntity.ok(partnerRequestService.getAllRequests());
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Listar solicitações de um usuário", description = "Retorna todas as solicitações feitas por um usuário")
    public ResponseEntity<List<PartnerRequestListDTO>> getRequestsByUser(@PathVariable Integer userId) {
        List<PartnerRequestListDTO> requests = partnerRequestService.getRequestsByUser(userId);
        return ResponseEntity.ok(requests);
    }
}
