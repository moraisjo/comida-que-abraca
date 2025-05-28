package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.dto.response.ResponseDTO;
import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.service.CampaignService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/campaign")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Campanhas", description = "Endpoints para gerenciamento de campanhas da ONG")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @Operation(summary = "Criar uma nova campanha", description = "Cria uma campanha com as informações fornecidas. Também notifica os usuários se solicitado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Campanha criada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Erro de validação ou campanha duplicada")
    })
    @PostMapping("/create-campaign")
    public ResponseEntity<ResponseDTO> createCampaign(@RequestBody CampaignDTO campaignDTO) {
        try {
            campaignService.createCampaign(campaignDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDTO("Campanha criada com sucesso!", 201));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO(e.getMessage(), 400));
        }
    }

    @Operation(summary = "Listar campanhas ativas", description = "Retorna uma lista de todas as campanhas com status 'ACTIVE'.")
    @ApiResponse(responseCode = "200", description = "Campanhas ativas retornadas com sucesso")
    @GetMapping("/active-campaigns")
    public ResponseEntity<List<CampaignEntity>> getActiveCampaigns() {
        List<CampaignEntity> campaigns = campaignService.getActiveCampaigns();
        return ResponseEntity.ok(campaigns);
    }

    @Operation(summary = "Listar campanhas inativas", description = "Retorna uma lista de todas as campanhas com status 'FINISHED'.")
    @ApiResponse(responseCode = "200", description = "Campanhas inativas retornadas com sucesso")
    @GetMapping("/inactive-campaigns")
    public ResponseEntity<List<CampaignEntity>> getInactiveCampaigns() {
        List<CampaignEntity> campaigns = campaignService.getInactiveCampaigns();
        return ResponseEntity.ok(campaigns);
    }
}
