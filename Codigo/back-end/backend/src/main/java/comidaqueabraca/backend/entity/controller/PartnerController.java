package comidaqueabraca.backend.entity.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/parceiros")
@Tag(name = "Parceiros", description = "Gerenciamento de parceiros que podem doar ou receber doações")
public class PartnerController {
    @Operation(summary = "Lista todos os parceiros cadastrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de parceiros retornada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping
    public ResponseEntity<List<String>> listarParceiros() {
        return ResponseEntity.ok(List.of("Parceiro 1", "Parceiro 2"));
    }
}
