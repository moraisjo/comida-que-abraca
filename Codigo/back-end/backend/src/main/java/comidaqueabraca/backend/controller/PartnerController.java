package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.CreatePartnerDTO;
import comidaqueabraca.backend.entity.PartnerEntity;
import comidaqueabraca.backend.dto.PartnerDTO;
import comidaqueabraca.backend.service.PartnerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Part;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/partners")
@Tag(name = "Parceiros", description = "Gerenciamento de parceiros que podem doar ou receber doações")
public class PartnerController {

    @Autowired
    private PartnerService partnerService;

    @Operation(summary = "Lista todos os parceiros cadastrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de parceiros retornada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })

    @GetMapping
    public ResponseEntity<List<String>> listarParceiros() {
        return ResponseEntity.ok(List.of("Parceiro 1", "Parceiro 2"));
    }

    @PostMapping("/create")
    public ResponseEntity<PartnerDTO> createPartner(@RequestBody @Valid CreatePartnerDTO data) {
        PartnerDTO newPartner = partnerService.createPartner(data); // retorna DTO para não expor dados sensíveis como senha
        return ResponseEntity.status(HttpStatus.CREATED).body(newPartner);
    }
}
